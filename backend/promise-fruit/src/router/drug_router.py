from typing import Any, Annotated

from fastapi import APIRouter, Depends, Path
from httpx import AsyncClient

from src.auth_session import get_current_user
from src.client import gg_client
from src.client.async_client import get_async_client
from src.constant import MedicationTime
from src.schema import PrescriptionDrugsResponse
from src.schema import SearchDrugNamesResponse

router = APIRouter(prefix="/api/drugs", tags=["drug"])


@router.get(
    path="/names/search",
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
    path="/medication-time/{medication_time}",
    summary="복용 시간별 약 목록 조회",
    description="특정 복용 시간(아침, 점심, 저녁)에 복용해야 하는 약 목록을 조회합니다"
)
async def find_drugs_by_medication_time(
    medication_time: Annotated[MedicationTime, Path(..., description="복용 시간")],
    current_user_id: int = Depends(get_current_user)
) -> PrescriptionDrugsResponse:
    raise NotImplementedError("Not supported yet.")
