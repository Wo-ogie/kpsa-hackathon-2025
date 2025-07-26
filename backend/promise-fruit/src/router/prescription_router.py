import asyncio
import json
from typing import Annotated

from fastapi import APIRouter, Response, Depends, Path
from openai import OpenAI
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth_session import get_current_user
from src.client.open_ai_client import get_openai_client
from src.constant import MedicationTime
from src.database import get_session
from src.entity import Prescription, PrescriptionDrug
from src.schema import (
    ParsePrescriptionRequest, ParsePrescriptionResponse, CreatePrescriptionRequest, PrescriptionResponse
)

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

router = APIRouter(prefix="/api", tags=["prescription"])


@router.post(
    path="/prescriptions/parse",
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


@router.post(
    path="/users/me/prescriptions",
    summary="처방전 등록",
    description="처방전 정보를 등록합니다."
)
async def create_prescription_for_other(
    request: CreatePrescriptionRequest,
    current_user_id: int = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> PrescriptionResponse:
    return await _create_prescription(
        user_id=current_user_id,
        request=request,
        session=session
    )


@router.post(
    path="/users/{user_id}/prescriptions",
    summary="처방전 등록",
    description="처방전 정보를 등록합니다."
)
async def create_prescription_for_other(
    user_id: Annotated[int, Path(..., description="처방전을 추가할 User ID")],
    request: CreatePrescriptionRequest,
    _: int = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> PrescriptionResponse:
    return await _create_prescription(
        user_id=user_id,
        request=request,
        session=session
    )


async def _create_prescription(
    user_id: int,
    request: CreatePrescriptionRequest,
    session: AsyncSession
) -> PrescriptionResponse:
    prescription: Prescription = Prescription(
        user_id=user_id,
        name=request.name,
        medication_start_date=request.medication_start_date,
    )
    session.add(prescription)
    await session.flush()

    prescription_drugs = []
    for drug_req in request.drugs:
        match drug_req.times_per_day:
            case 1:
                prescription_drugs.append(
                    PrescriptionDrug(
                        prescription_id=prescription.id,
                        name=drug_req.name,
                        dose_per_time=drug_req.dose_per_time,
                        medication_time=MedicationTime.NOON,
                        count=drug_req.days
                    )
                )
            case 2:
                prescription_drugs.extend([
                    PrescriptionDrug(
                        prescription_id=prescription.id,
                        name=drug_req.name,
                        dose_per_time=drug_req.dose_per_time,
                        medication_time=MedicationTime.MORNING,
                        count=drug_req.days
                    ),
                    PrescriptionDrug(
                        prescription_id=prescription.id,
                        name=drug_req.name,
                        dose_per_time=drug_req.dose_per_time,
                        medication_time=MedicationTime.EVENING,
                        count=drug_req.days
                    )
                ])
            case 3:
                prescription_drugs.extend([
                    PrescriptionDrug(
                        prescription_id=prescription.id,
                        name=drug_req.name,
                        dose_per_time=drug_req.dose_per_time,
                        medication_time=MedicationTime.MORNING,
                        count=drug_req.days
                    ),
                    PrescriptionDrug(
                        prescription_id=prescription.id,
                        name=drug_req.name,
                        dose_per_time=drug_req.dose_per_time,
                        medication_time=MedicationTime.NOON,
                        count=drug_req.days
                    ),
                    PrescriptionDrug(
                        prescription_id=prescription.id,
                        name=drug_req.name,
                        dose_per_time=drug_req.dose_per_time,
                        medication_time=MedicationTime.EVENING,
                        count=drug_req.days
                    )
                ])
    session.add_all(prescription_drugs)

    await session.commit()
    await session.refresh(prescription)

    await prescription.awaitable_attrs.drugs
    return PrescriptionResponse.model_validate(prescription)
