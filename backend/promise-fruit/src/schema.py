from datetime import datetime

from pydantic import BaseModel, Field, ConfigDict


class KakaoLoginRequest(BaseModel):
    authorization_code: str = Field(..., description="카카오 '인가 코드 받기'를 통해 얻은 인가 코드")
    redirect_url: str = Field(..., description="인가 코드가 리다이렉트된 url")


class KakaoLoginTokenRequest(BaseModel):
    access_token: str = Field(...)


class SignUpRequest(BaseModel):
    nickname: str = Field(..., description="별명", examples=["황덕순"])
    phone_number: str = Field(..., description="전화번호", examples=["01012345678"])
    is_guardian: bool = Field(..., description="보호자인지 여부")


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(..., )
    nickname: str
    phone_number: str
    point: int
    is_guardian: bool
    created_at: datetime
    updated_at: datetime
