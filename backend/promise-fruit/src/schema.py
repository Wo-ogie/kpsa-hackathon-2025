from datetime import datetime, date

from pydantic import BaseModel, Field, ConfigDict, field_serializer

from src.constant import MedicationTime
from src.entity import PrescriptionDrug

"""
Auth
"""


class KakaoLoginRequest(BaseModel):
    authorization_code: str = Field(..., description="카카오 '인가 코드 받기'를 통해 얻은 인가 코드")
    redirect_url: str = Field(..., description="인가 코드가 리다이렉트된 url")


class KakaoLoginTokenRequest(BaseModel):
    access_token: str = Field(...)


class SignUpRequest(BaseModel):
    nickname: str = Field(..., description="별명", examples=["황덕순"])
    phone_number: str = Field(..., description="전화번호", examples=["01012345678"])
    is_guardian: bool = Field(..., description="보호자인지 여부")


"""
User
"""


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(..., description="User id")
    nickname: str = Field(..., description="별명")
    point: int = Field(..., description="현재 잔여 포인트")
    is_guardian: bool = Field(..., description="보호자 여부")
    created_at: datetime = Field(..., description="생성 시각")
    updated_at: datetime = Field(..., description="수정 시각")


"""
Drug
"""


class SearchDrugNamesResponse(BaseModel):
    drug_names: list[str] = Field(..., description="약 이름")


class PrescriptionDrugResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(..., description="약 ID")
    name: str = Field(..., description="약 이름")
    dose_per_time: float = Field(..., description="1회 투약량")
    medication_time: MedicationTime = Field(..., description="복용 시간")
    count: int = Field(..., description="현재 잔여 약 개수")
    created_at: datetime = Field(..., description="생성 시각")
    updated_at: datetime = Field(..., description="수정 시각")


"""
Prescription
"""


class ParsePrescriptionRequest(BaseModel):
    text: str = Field(..., description="OCR을 사용해 처방전에서 추출한 텍스트 데이터")


class CreatePrescriptionRequest(BaseModel):
    class DrugRequest(BaseModel):
        name: str = Field(..., description="약 이름")
        dose_per_time: float = Field(..., description="1회 투약량")
        times_per_day: int = Field(..., description="1일 투여 횟수 (1~3)", ge=1, le=3)
        days: int = Field(description="총 투약 일수")

    name: str = Field(..., description="처방전 이름")
    medication_start_date: date = Field(..., description="복용 시작일", examples=["2025-07-26"])
    medication_times: list[MedicationTime] = Field(..., description="복용 시간")
    drugs: list[DrugRequest] = Field(..., description="복용할 약 리스트")


class ParsePrescriptionResponse(BaseModel):
    class DrugResponse(BaseModel):
        drug: str = Field(..., description="약 이름")
        dose_per_time: float | None = Field(None, description="1회 투약량")
        times_per_day: int | None = Field(None, description="1일 투여 횟수")
        days: int | None = Field(None, description="총 투약 일수")

    drugs: list[DrugResponse] = Field(..., description="약 정보가 담긴 리스트")


class PrescriptionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(..., description="처방전 ID")
    user_id: int = Field(..., description="User ID")
    name: str = Field(..., description="이름")
    medication_start_date: date = Field(..., description="복용 시작일")
    drugs: list[PrescriptionDrugResponse] = Field(..., description="복용하는 약 목록")
    created_at: datetime = Field(..., description="생성 시각")
    updated_at: datetime = Field(..., description="수정 시각")

    @field_serializer("drugs")
    def serialize_drugs(self, drugs: list[PrescriptionDrug]) -> list[PrescriptionDrugResponse]:
        return [
            PrescriptionDrugResponse(
                id=drug.id,
                name=drug.name,
                dose_per_time=drug.dose_per_time,
                medication_time=drug.medication_time,
                count=drug.count,
                created_at=drug.created_at,
                updated_at=drug.updated_at,
            )
            for drug in drugs
        ]
