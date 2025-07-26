import asyncio
import json

from fastapi import APIRouter, Response, Depends
from openai import OpenAI

from client.open_ai import get_openai_client
from src.schema import ParsePrescriptionRequest, ParsePrescriptionResponse

PARSE_PRESCRIPTION_TEMPLATE: str = """OCR로 추출한 처방전 텍스트 데이터가 주어집니다.
    약명, 1회 복용량, 1일 복용 횟수, 복용 일수 등이 한 행씩 나올 수도 있고, 숫자가 따로 떨어져 있을 수도 있습니다.
    모든 데이터를 읽어서 약명별로 1회 복용량, 1일 복용 횟수, 복용 일수를 추정해 주세요.
    ```[
      {
        "drug": "타이레놀정",
        "dose_per_time": "2",
        "times_per_day": "3",
        "days": "5"
      }
    ]```
    반드시 위 출력 예시처럼 JSON만 반환해 주세요. (단, 코드블럭 형식 제외)

    Text:
    """

router = APIRouter(prefix="/api/prescriptions", tags=["prescription"])


@router.post(
    path="/parse",
    summary="처방전 텍스트 분석",
    description="처방전에서 OCR로 추출된 텍스트를 분석하여 약 정보를 추출합니다."
)
async def parse_prescriptions(
    request: ParsePrescriptionRequest,
    openai_client: OpenAI = Depends(get_openai_client)
) -> ParsePrescriptionResponse:
    llm_response: Response = await asyncio.to_thread(
        openai_client.responses.create,
        model="gpt-4.1",
        input=PARSE_PRESCRIPTION_TEMPLATE + request.text
    )
    drugs: list[ParsePrescriptionResponse.DrugResponse] = [
        ParsePrescriptionResponse.DrugResponse.model_validate(item)
        for item in json.loads(llm_response.output_text)
    ]
    return ParsePrescriptionResponse(drugs=drugs)
