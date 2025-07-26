from datetime import datetime

from pydantic import BaseModel, Field, ConfigDict

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

    id: int = Field(..., )
    nickname: str
    phone_number: str
    point: int
    is_guardian: bool
    created_at: datetime
    updated_at: datetime


"""
Prescription
"""


class ParsePrescriptionRequest(BaseModel):
    text: str = Field(..., description="OCR을 사용해 처방전에서 추출한 텍스트 데이터")


class ParsePrescriptionResponse(BaseModel):
    class DrugResponse(BaseModel):
        drug: str = Field(..., description="약 이름")
        dose: str | None = Field(None, description="용량")
        dose_per_time: str | None = Field(None, description="1회 투약량")
        times_per_day: str | None = Field(None, description="1일 투여 횟수")
        days: str | None = Field(None, description="총 투약 일수")

    drugs: list[DrugResponse] = Field(..., description="약 정보가 담긴 리스트")
