from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Path
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth_session import get_current_user
from src.database import get_session
from src.entity import Plant
from src.entity import Prescription, MedicationHistory, UserPlant
from src.schema import (
    MedicationVerificationRequest, MedicationVerificationResponse, UserPlantResponse, MedicationHistoriesResponse,
    MedicationHistoryResponse
)

router = APIRouter(prefix="/api", tags=["medication"])


@router.get(
    path="/users/me/medication-histories",
    summary="내 복용 기록 조회",
    description="내 복용 기록을 조회합니다."
)
async def find_my_medication_histories(
    current_user_id: int = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> MedicationHistoriesResponse:
    result = await session.execute(
        select(MedicationHistory).where(MedicationHistory.user_id == current_user_id)
    )
    histories: list[MedicationHistory] = result.unique().scalars().all()

    return MedicationHistoriesResponse(
        histories=[MedicationHistoryResponse.model_validate(history) for history in histories]
    )


@router.get(
    path="/users/{user_id}/medication-histories",
    summary="복용 기록 조회",
    description="유저의 복용 기록을 조회합니다."
)
async def find_my_medication_histories(
    user_id: Annotated[int, Path],
    _: int = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    result = await session.execute(
        select(MedicationHistory).where(MedicationHistory.user_id == user_id)
    )
    histories: list[MedicationHistory] = result.unique().scalars().all()

    return MedicationHistoriesResponse(
        histories=[MedicationHistoryResponse.model_validate(history) for history in histories]
    )


@router.post(
    path="/medications/verify",
    summary="복용 인증",
    description="약을 복용했음을 인증하고, 현재 키우고 있는 식물의 성장도를 증가시킵니다.",
    responses={
        404: {"description": "키우고 있는 식물이 없는 경우"},
    }
)
async def verify_medication(
    request: MedicationVerificationRequest,
    current_user_id: int = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> MedicationVerificationResponse:
    result = await session.execute(
        select(Prescription).where(Prescription.id.in_(request.prescription_ids))
    )
    prescriptions: list[Prescription] = result.unique().scalars().all()

    result = await session.execute(
        select(UserPlant)
        .where(UserPlant.user_id == current_user_id, UserPlant.is_completed == False)
    )
    user_plant: UserPlant | None = result.scalar()
    if user_plant is None:
        raise HTTPException(status_code=404, detail="Active plant not found.")

    result = await session.execute(
        select(Plant).where(Plant.id == user_plant.plant_id)
    )
    plant: Plant | None = result.scalar()
    if plant is None:
        raise HTTPException(status_code=404, detail="Plant not found.")

    # 처방전에 있는 약들 복용하기
    medication_histories: list[MedicationHistory] = []
    for prescription in prescriptions:
        for drug in prescription.drugs:
            if drug.medication_time != request.medication_time:
                continue
            drug.count -= 1

        medication_histories.append(
            MedicationHistory(
                user_id=current_user_id,
                prescription_id=prescription.id,
                medication_time=request.medication_time,
            )
        )
    session.add_all(medication_histories)

    # 식물 성장도 증가
    user_plant.growth += plant.growth_increment
    if user_plant.growth >= 100:
        user_plant.fruit_count = plant.max_fruit_count

    await session.commit()
    await session.flush()

    return MedicationVerificationResponse(
        medication_history_ids=[medication_history.id for medication_history in medication_histories],
        active_plant=UserPlantResponse.model_validate(user_plant)
    )
