from typing import Any

from fastapi import APIRouter, Depends
from httpx import AsyncClient

from src.client import gg_client
from src.client.async_client import get_async_client
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
