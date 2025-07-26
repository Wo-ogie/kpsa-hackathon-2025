from fastapi import APIRouter, Depends

from src.auth_session import get_current_user
from src.schema import (
    ActivePlantResponse, FindActivePlantResponse, PlantPlantRequest, HarvestFruitResponse,
    UpdateActivePlantNicknameRequest
)

router = APIRouter(prefix="/api/plants", tags=["plant"])


@router.get(
    path="/active",
    summary="현재 키우고 있는 식물 조회",
    description="현재 키우고 있는 식물 정보를 조회합니다."
)
async def find_active_plant() -> FindActivePlantResponse:
    raise NotImplementedError("Not supported yet.")


@router.post(
    path="/plant",
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
    current_user_id: int = Depends(get_current_user)
) -> ActivePlantResponse:
    raise NotImplementedError("Not supported yet.")


@router.post(
    path="/active/harvest",
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
) -> HarvestFruitResponse:
    raise NotImplementedError("Not supported yet.")


@router.put(
    path="/active/nicknames",
    summary="키우고 있는 식물의 별명 수정",
    description="현재 키우고 있는 식물의 별명을 변경합니다."
)
async def update_active_plant_nickname(
    request: UpdateActivePlantNicknameRequest,
) -> ActivePlantResponse:
    raise NotImplementedError("Not supported yet.")
