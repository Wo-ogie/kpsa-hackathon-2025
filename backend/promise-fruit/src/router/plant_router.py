from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth_session import get_current_user
from src.database import get_session
from src.entity import User
from src.entity import UserPlant, Plant
from src.schema import (
    ActivePlantResponse, PlantPlantRequest, HarvestFruitResponse, UpdateActivePlantNicknameRequest,
    FindActivePlantResponse, PlantAlbumResponse
)
from src.schema import UserPlantResponse

router = APIRouter(prefix="/api", tags=["plant"])


@router.get(
    path="/users/me/plant-albums",
    summary="내 식물 앨범 조회",
    description="내 식물 앨범을 조회합니다. 그동안 내가 키운 식물들이 조회됩니다. 식물이 전부 수확된 날짜는 `updated_at`을 사용하시면 됩니다."
)
async def find_my_plant_albums(
    current_user_id: int = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> PlantAlbumResponse:
    result = await session.execute(
        select(UserPlant)
        .where(UserPlant.user_id == current_user_id, UserPlant.is_completed == True)
    )
    plants: list[UserPlant] = result.unique().scalars().all()
    return PlantAlbumResponse(plants=[
        UserPlantResponse.model_validate(plant)
        for plant in plants
    ])


@router.get(
    path="/users/{user_id}/plant-albums",
    summary="식물 앨범 조회",
    description="식물 앨범을 조회합니다. 그동안 유저가 키운 식물들이 조회됩니다."
)
async def find_plant_albums(
    user_id: int,
    _: int = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> PlantAlbumResponse:
    result = await session.execute(
        select(UserPlant)
        .where(UserPlant.user_id == user_id, UserPlant.is_completed == True)
    )
    plants: list[UserPlant] = result.unique().scalars().all()
    return PlantAlbumResponse(plants=[
        UserPlantResponse.model_validate(plant)
        for plant in plants
    ])


@router.get(
    path="/plants/active",
    summary="현재 키우고 있는 식물 조회",
    description="현재 키우고 있는 식물 정보를 조회합니다."
)
async def find_active_plant(
    current_user_id: int = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> FindActivePlantResponse:
    result = await session.execute(
        select(UserPlant)
        .where(UserPlant.user_id == current_user_id, UserPlant.is_completed == False)
    )
    user_plant: UserPlant | None = result.scalar()
    if user_plant is None:
        return FindActivePlantResponse(active_plant=None)
    return FindActivePlantResponse(active_plant=UserPlantResponse.model_validate(user_plant))


@router.post(
    path="/plants/plant",
    summary="식물 심기",
    description="식물을 심습니다. "
                "심은 식물은 현재 내가 키우는 식물로 간주되어, '현재 키우고 있는 식물 조회 API'에서 조회됩니다. "
                "심으려는 식물이 유료 식물(배 나무 등)인 경우, 포인트가 차감됩니다.",
    responses={
        403: {"description": "해금하지 않은 식물을 심으려고 하는 경우"},
        409: {"description": "이미 키우고 있는 식물이 있는 경우"},
    }
)
async def plant_plant(
    request: PlantPlantRequest,
    current_user_id: int = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> ActivePlantResponse:
    result = await session.execute(
        select(Plant).where(Plant.id == request.plant_id)
    )
    plant: Plant | None = result.scalar()

    if plant is None:
        raise HTTPException(status_code=404, detail="Plant not found.")

    user_plant: UserPlant = UserPlant(
        user_id=current_user_id,
        plant_id=request.plant_id,
        nickname=plant.name,
        growth=0,
        fruit_count=0,
        is_completed=False,
    )
    session.add(user_plant)

    await session.commit()
    await session.flush()

    return ActivePlantResponse(active_plant=UserPlantResponse.model_validate(user_plant))


@router.post(
    path="/plants/active/harvest",
    summary="키우고 있는 식물 열매 수확",
    description="현재 키우고 있는 식물에서 열린 열매를 수확하여 포인트를 획득합니다. "
                "열매는 한 번(호출)에 하나씩 수확합니다. "
                "수확이 끝난(열매가 0이 된) 식물은 더 이상 '키우고 있는 식물'로 간주되지 않습니다. "
                "키우고 있는 식물이 없거나 수확할 열매가 없으면 오류가 발생합니다.",
    responses={
        400: {"description": "키우고 있는 식물이 없거나 수확할 열매가 없는 경우"},
    }
)
async def harvest_active_plant_fruit(
    current_user_id: int = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> HarvestFruitResponse:
    result = await session.execute(
        select(User).where(User.id == current_user_id)
    )
    user: User | None = result.scalar()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found.")

    result = await session.execute(
        select(UserPlant)
        .where(UserPlant.user_id == current_user_id, UserPlant.is_completed == False)
    )
    user_plant: UserPlant | None = result.scalar()
    if user_plant is None:
        raise HTTPException(status_code=404, detail="Active plant not found.")

    # 수확
    user_plant.fruit_count -= 1
    user.point += user_plant.plant.point_per_fruit

    if user_plant.fruit_count <= 0:
        user_plant.is_completed = True

    await session.commit()

    return HarvestFruitResponse(
        points_earned=user_plant.plant.point_per_fruit,
        remaining_fruit_count=user_plant.fruit_count,
        current_user_point=user.point,
        active_plant=UserPlantResponse.model_validate(user_plant)
    )


@router.put(
    path="/plants/active/nicknames",
    summary="키우고 있는 식물의 별명 수정",
    description="현재 키우고 있는 식물의 별명을 변경합니다."
)
async def update_active_plant_nickname(
    request: UpdateActivePlantNicknameRequest,
    current_user_id: int = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> ActivePlantResponse:
    result = await session.execute(
        select(UserPlant)
        .where(UserPlant.user_id == current_user_id, UserPlant.is_completed == False)
    )
    user_plant: UserPlant | None = result.scalar()
    if user_plant is None:
        raise HTTPException(status_code=404, detail="Active plant not found.")

    user_plant.nickname = request.nickname

    await session.commit()

    return ActivePlantResponse(active_plant=UserPlantResponse.model_validate(user_plant))
