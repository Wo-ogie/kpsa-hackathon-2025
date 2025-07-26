from fastapi import APIRouter, Depends

from src.auth_session import get_current_user
from src.schema import MedicationVerificationRequest, MedicationVerificationResponse

router = APIRouter(prefix="/api/medications", tags=["medication"])


@router.post(
    path="/verify",
    summary="복용 인증",
    description="약을 복용했음을 인증하고, 현재 키우고 있는 식물의 성장도를 증가시킵니다."
)
async def verify_medication(
    request: MedicationVerificationRequest,
    current_user_id: int = Depends(get_current_user)
) -> MedicationVerificationResponse:
    raise NotImplementedError("Not supported yet.")
