from datetime import datetime, date

from pydantic import BaseModel, Field, ConfigDict, field_serializer

from src.constant import MedicationTime
from src.entity import PrescriptionDrug, Plant, Family

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


class LoginResponse(BaseModel):
    session_id: str = Field(..., description="session_id")


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


class MedicationVerificationRequest(BaseModel):
    medication_time: MedicationTime = Field(..., description="복용 시간 (아침/점심/저녁)")
    prescription_ids: list[int] = Field(..., description="복용을 끝낸 처방전들의 ID 목록")


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


class PrescriptionDrugsResponse(BaseModel):
    drugs: list[PrescriptionDrugResponse] = Field(..., description="약 목록")


class MedicationVerificationResponse(BaseModel):
    medication_history_ids: list[int] = Field(..., description="복약 인증 기록 ID 리스트 (처방전 단위)")
    active_plant: "UserPlantResponse" = Field(..., description="현재 키우고 있는 식물 정보")


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
            PrescriptionDrugResponse.model_validate(drug)
            for drug in drugs
        ]


class PrescriptionsResponse(BaseModel):
    prescriptions: list[PrescriptionResponse]


"""
Plant
"""


class PlantPlantRequest(BaseModel):
    plant_id: int = Field(..., description="심으려는 식물의 id")


class UpdateActivePlantNicknameRequest(BaseModel):
    nickname: str = Field(..., description="식물의 별명")


class PlantResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(..., description="Plant id")
    name: str = Field(..., description="식물 이름")
    max_fruit_count: int = Field(..., description="식물이 성장했을 때, 열리는 열매 개수")
    point_per_fruit: int = Field(..., description="열매 하나 당 획득하는 포인트")
    unlock_price: int = Field(..., description="잠금 해제에 필요한 포인트")
    plant_price: int = Field(..., description="식물을 심는 데 필요한 포인트")
    growth_increment: int = Field(..., description="성장 증가량")
    created_at: datetime = Field(..., description="생성 시각")
    updated_at: datetime = Field(..., description="수정 시각")


class UserPlantResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(..., description="UserPlant id")
    plant: PlantResponse = Field(..., description="식물(상품) 정보")
    nickname: str = Field(..., description="별칭")
    growth: int = Field(..., description="성장도 (0~100)")
    fruit_count: int = Field(..., description="현재 열려있는 열매 개수")
    is_completed: bool = Field(..., description="성장 및 수확이 끝난 식물인지 여부. 성장 및 수확이 끝났다면 `true`로 응답")
    created_at: datetime = Field(..., description="생성 시각")
    updated_at: datetime = Field(..., description="수정 시각")

    @field_serializer("plant")
    def serialize_plant(self, plant: Plant) -> PlantResponse:
        return PlantResponse.model_validate(plant)


class ActivePlantResponse(BaseModel):
    active_plant: UserPlantResponse = Field(..., description="현재 키우고 있는 식물 정보")


class FindActivePlantResponse(BaseModel):
    active_plant: UserPlantResponse | None = Field(..., description="현재 키우고 있는 식물 정보. 없는 경우 `null`")


class HarvestFruitResponse(BaseModel):
    points_earned: int = Field(..., description="획득한 포인트")
    remaining_fruit_count: int = Field(..., description="수확 후 남은 열매 개수")
    current_user_point: int = Field(..., description="수확 후 사용자 총 포인트")
    active_plant: UserPlantResponse = Field(..., description="수확 후 키우고 있는 식물 정보")


class PlantAlbumResponse(BaseModel):
    plants: list[UserPlantResponse] = Field(..., description="유저가 키운 식물 목록")


"""
Medication
"""


class MedicationHistoryResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(..., description="복용 기록 ID")
    prescription: PrescriptionResponse = Field(..., description="복용한 처방전 정보")
    medication_time: MedicationTime = Field(..., description="복용 시간")
    created_at: datetime = Field(..., description="생성 시각")
    updated_at: datetime = Field(..., description="수정 시각")


class MedicationHistoriesResponse(BaseModel):
    histories: list[MedicationHistoryResponse] = Field(..., description="복용 기록 목록")


"""
Family
"""


class AddUserToFamilyRequest(BaseModel):
    target_phone_number: str = Field(..., description="가족으로 추가할 유저의 전화번호")
    target_nickname: str = Field(..., description="추가 대상에 대한 별명")
    allow_view_medication: bool = Field(..., description="자신의 복용 기록 열람 허용 여부")
    allow_alarm: bool = Field(..., description="자신의 약물 미복용 시, 알림 전달 여부")


class AddUserToFamilyResponse(BaseModel):
    requester_id: int = Field(..., description="가족 추가 요청을 보낸 유저의 ID")
    recipient_id: int = Field(..., description="가족 추가 요청을 받은 유저의 ID")


class FamilyMemberResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(..., description="User id")
    nickname: str = Field(..., description="가족 별명")
    is_guardian: bool = Field(..., description="대상 유저가 보호자인지 여부")
    allow_view_medication: bool = Field(..., description="(상대방이 나에게) 복용 기록 열람 허용 여부")
    allow_alarm: bool = Field(..., description="(상대방이 나에게) 약물 미복용 시 알림 전달 허용 여부")
    created_at: datetime = Field(..., description="생성 시각")
    updated_at: datetime = Field(..., description="수정 시각")

    @classmethod
    def model_validate_family(cls, family: Family, is_requester: bool) -> "FamilyMemberResponse":
        user = family.recipient if is_requester else family.requester
        nickname = family.recipient_nickname if is_requester else family.requester_nickname
        allow_view = family.recipient_allow_view_medication if is_requester else family.requester_allow_view_medication
        allow_alarm = family.recipient_allow_alarm if is_requester else family.requester_allow_alarm
        return cls.model_validate({
            "id": user.id,
            "nickname": nickname,
            "is_guardian": user.is_guardian,
            "allow_view_medication": allow_view,
            "allow_alarm": allow_alarm,
            "created_at": family.created_at,
            "updated_at": family.updated_at
        })


class FamilyMembersResponse(BaseModel):
    family_members: list[FamilyMemberResponse] = Field(..., description="가족으로 등록된 유저 목록")
