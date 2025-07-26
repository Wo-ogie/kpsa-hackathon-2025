from typing import Any, Annotated

from fastapi import APIRouter, Depends, Query
from httpx import AsyncClient
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth_session import get_current_user
from src.client import gg_client
from src.client.async_client import get_async_client
from src.constant import MedicationTime
from src.database import get_session
from src.entity import PrescriptionDrug, Prescription
from src.schema import PrescriptionDrugsResponse, PrescriptionDrugResponse
from src.schema import SearchDrugNamesResponse

router = APIRouter(prefix="/api", tags=["drug"])


@router.get(
    path="/drugs/names/search",
    summary="약 이름 검색",
    description="약 이름을 검색합니다",
)
async def search_drug_names(
    name: str,
    client: AsyncClient = Depends(get_async_client)
) -> SearchDrugNamesResponse:
    drugs: list[dict[str, Any]] = await gg_client.find_drugs(client, name=name)
    drug_names: list[str] = [drug["ITEM_NAME"] for drug in drugs]
    return SearchDrugNamesResponse(drug_names=drug_names)


@router.get(
    path="/users/me/drugs",
    summary="복용 약 목록 조회",
    description="복용 약 목록을 조회합니다"
)
async def find_my_drugs(
    medication_time: Annotated[MedicationTime, Query(..., description="복용 시간")],
    current_user_id: int = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> PrescriptionDrugsResponse:
    result = await session.execute(
        select(PrescriptionDrug)
        .join(Prescription)
        .where(
            Prescription.user_id == current_user_id,
            PrescriptionDrug.medication_time == medication_time
        )
    )
    drugs: list[PrescriptionDrug] = result.unique().scalars().all()
    drug_responses: list[PrescriptionDrugResponse] = [PrescriptionDrugResponse.model_validate(drug) for drug in drugs]
    return PrescriptionDrugsResponse(drugs=drug_responses)
