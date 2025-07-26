from typing import Any

from httpx import AsyncClient

from src.envs import get_envs, Envs

envs: Envs = get_envs()


async def find_drugs(
    client: AsyncClient,
    name: str | None = None,
) -> list[dict[str, Any]]:
    params: dict[str, Any] = {
        "serviceKey": envs.GGDATA_API_KEY,
        "type": "json",
        "pageNo": 1,
        "numOfRows": 100,
    }
    if name is not None:
        params["item_name"] = name
    response = await client.get(
        url="https://apis.data.go.kr/1471000/DrugPrdtPrmsnInfoService06/getDrugPrdtPrmsnDtlInq05",
        params=params,
    )
    response_data = response.json()
    return response_data["body"]["items"]
