from datetime import datetime

from sqlalchemy import DateTime, BigInteger, String, Integer, Boolean
from sqlalchemy.ext.asyncio import AsyncAttrs
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class BaseEntity(DeclarativeBase, AsyncAttrs):
    __abstract__ = True

    created_at: Mapped[datetime] = mapped_column(
        "created_at",
        DateTime,
        nullable=False,
        default=datetime.now,
    )
    updated_at: Mapped[datetime] = mapped_column(
        "updated_at",
        DateTime,
        nullable=False,
        default=datetime.now,
    )


class User(BaseEntity):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column("id", BigInteger, primary_key=True, autoincrement=True)
    nickname: Mapped[str] = mapped_column("nickname", String(50), nullable=False)
    phone_number: Mapped[str] = mapped_column("phone_number", String(50), nullable=False)
    point: Mapped[int] = mapped_column("point", Integer, nullable=False, default=0)
    is_guardian: Mapped[bool] = mapped_column("is_guardian", Boolean, nullable=False, default=False)
    kakao_uid: Mapped[str] = mapped_column("kakao_uid", String(255), nullable=False)
    fcm_token: Mapped[str] = mapped_column("fcm_token", String(255), nullable=False)
