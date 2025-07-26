from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth_session import get_current_user
from src.database import get_session
from src.entity import Family, User
from src.schema import AddUserToFamilyRequest, AddUserToFamilyResponse, FamilyMembersResponse, FamilyMemberResponse

router = APIRouter(prefix="/api/families", tags=["family"])


@router.get(
    path="",
    summary="가족 목록 조회",
    description="가족으로 추가된 유저 목록을 조회합니다."
)
async def find_family_members(
    current_user_id: int = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> FamilyMembersResponse:
    result = await session.execute(
        select(User).where(User.id == current_user_id)
    )
    current_user: User | None = result.scalar()
    if current_user is None:
        raise HTTPException(status_code=404, detail="Current user not found.")

    family_member_responses: list[FamilyMemberResponse] = []
    await current_user.awaitable_attrs.requested_families
    for family in current_user.requested_families:
        family_member_responses.append(FamilyMemberResponse.model_validate_family(family, is_requester=True))
    await current_user.awaitable_attrs.received_families
    for family in current_user.received_families:
        family_member_responses.append(FamilyMemberResponse.model_validate_family(family, is_requester=False))

    return FamilyMembersResponse(family_members=family_member_responses)


@router.post(
    path="",
    summary="유저를 가족으로 추가",
    description="유저를 가족으로 추가합니다."
)
async def add_user_to_family(
    request: AddUserToFamilyRequest,
    current_user_id: int = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> AddUserToFamilyResponse:
    result = await session.execute(
        select(User).where(User.id == current_user_id)
    )
    request_user: User | None = result.scalar()
    if request_user is None:
        raise HTTPException(status_code=404, detail="Request user not found.")

    result = await session.execute(
        select(User).where(User.phone_number == request.target_phone_number)
    )
    recipient_user: User | None = result.scalar()
    if recipient_user is None:
        raise HTTPException(status_code=404, detail="User not found.")

    result = await session.execute(
        select(Family).where(
            (
                (Family.requester_id == current_user_id) &
                (Family.recipient_id == recipient_user.id)
            ) |
            (
                (Family.requester_id == recipient_user.id) &
                (Family.recipient_id == current_user_id)
            )
        )
    )
    existing_family: Family | None = result.scalar()
    if existing_family is not None:
        raise HTTPException(status_code=409, detail="Family relationship already exists.")

    family: Family = Family(
        requester_id=current_user_id,
        requester_nickname=request_user.nickname,
        recipient_id=recipient_user.id,
        recipient_nickname=request.target_nickname,
        requester_allow_view_medication=request.allow_view_medication,
        requester_allow_alarm=request.allow_view_medication,
        recipient_allow_view_medication=True,
        recipient_allow_alarm=True,
    )
    session.add(family)

    await session.commit()

    return AddUserToFamilyResponse(requester_id=current_user_id, recipient_id=recipient_user.id)
