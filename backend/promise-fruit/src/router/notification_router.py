from typing import Annotated

from fastapi import APIRouter, Depends, Path, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth_session import get_current_user
from src.database import get_session
from src.entity import Notification
from src.schema import NotificationsResponse, NotificationResponse

router = APIRouter(prefix="/api/notifications", tags=["notification"])


@router.get(
    path="/",
    summary="알림 목록 조회",
    description="나에게 온 알림 목록을 조회합니다.",
)
async def find_notifications(
    current_user_id: int = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> NotificationsResponse:
    result = await session.execute(
        select(Notification).where(Notification.user_id == current_user_id)
    )
    notifications: list[Notification] = result.scalars().all()
    return NotificationsResponse(
        notifications=[
            NotificationResponse.model_validate(notification)
            for notification in notifications
        ]
    )


@router.patch(
    path="/{notification_id}/read",
    summary="알림 읽음 처리",
    description=".",
)
async def find_notifications(
    notification_id: Annotated[int, Path(..., description="")],
    current_user_id: int = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> NotificationResponse:
    result = await session.execute(
        select(Notification)
        .where(Notification.id == notification_id, Notification.user_id == current_user_id)
    )
    notification: Notification | None = result.scalar()
    if notification is None:
        raise HTTPException(status_code=404, detail="Notification not found.")

    notification.is_read = True

    return NotificationResponse.model_validate(notification)
