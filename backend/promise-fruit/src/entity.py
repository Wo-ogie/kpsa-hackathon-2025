from datetime import datetime, date

from sqlalchemy import DateTime, BigInteger, String, Integer, Boolean, Date, ForeignKey, Double, SmallInteger
from sqlalchemy.ext.asyncio import AsyncAttrs
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

from src.constant import MedicationTime


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

    purchased_plants: Mapped[list["PurchasedPlant"]] = relationship("PurchasedPlant", lazy="joined")

    # Family 관련 연관관계 추가
    requested_families: Mapped[list["Family"]] = relationship(
        "Family",
        foreign_keys="Family.requester_id",
        back_populates="requester",
        lazy="select"
    )
    received_families: Mapped[list["Family"]] = relationship(
        "Family",
        foreign_keys="Family.recipient_id",
        back_populates="recipient",
        lazy="select"
    )


class Prescription(BaseEntity):
    __tablename__ = "prescription"

    id: Mapped[int] = mapped_column("id", BigInteger, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column("user_id", BigInteger, ForeignKey("user.id"), nullable=False)
    name: Mapped[str] = mapped_column("name", String(50), nullable=False)
    medication_start_date: Mapped[date] = mapped_column("medication_start_date", Date, nullable=False)

    user: Mapped[User] = relationship("User", lazy="joined")
    drugs: Mapped[list["PrescriptionDrug"]] = relationship(
        "PrescriptionDrug", lazy="joined", back_populates="prescription", cascade="all, delete-orphan"
    )


class PrescriptionDrug(BaseEntity):
    __tablename__ = "prescription_drug"

    id: Mapped[int] = mapped_column("id", BigInteger, primary_key=True, autoincrement=True)
    prescription_id: Mapped[int] = mapped_column(
        "prescription_id", BigInteger, ForeignKey("prescription.id"), nullable=False
    )
    name: Mapped[str] = mapped_column("name", String(50), nullable=False)
    dose_per_time: Mapped[float] = mapped_column("dose_per_time", Double, nullable=False)
    medication_time: Mapped[MedicationTime] = mapped_column("medication_time", nullable=False)
    count: Mapped[int] = mapped_column("count", Integer, nullable=False)

    prescription: Mapped["Prescription"] = relationship("Prescription", lazy="joined", back_populates="drugs")


class Plant(BaseEntity):
    __tablename__ = "plant"

    id: Mapped[int] = mapped_column("id", BigInteger, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column("name", String(50), nullable=False)
    max_fruit_count: Mapped[int] = mapped_column("max_fruit_count", Integer, nullable=False)
    point_per_fruit: Mapped[int] = mapped_column("point_per_fruit", Integer, nullable=False)
    unlock_price: Mapped[int] = mapped_column("unlock_price", Integer, nullable=False)
    plant_price: Mapped[int] = mapped_column("plant_price", Integer, nullable=False)
    growth_increment: Mapped[int] = mapped_column("growth_increment", SmallInteger, nullable=False)


class UserPlant(BaseEntity):
    __tablename__ = "user_plant"

    id: Mapped[int] = mapped_column("id", BigInteger, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column("user_id", BigInteger, ForeignKey("user.id"), nullable=False)
    plant_id: Mapped[int] = mapped_column("plant_id", BigInteger, ForeignKey("plant.id"), nullable=False)
    nickname: Mapped[str] = mapped_column("nickname", String(50), nullable=False)
    growth: Mapped[int] = mapped_column("growth", Integer, nullable=False)
    fruit_count: Mapped[int] = mapped_column("fruit_count", Integer, nullable=False, default=0)
    is_completed: Mapped[bool] = mapped_column("is_completed", Boolean, nullable=False, default=False)

    user: Mapped["User"] = relationship("User", lazy="joined")
    plant: Mapped["Plant"] = relationship("Plant", lazy="joined")


class PurchasedPlant(BaseEntity):
    __tablename__ = "purchased_plant"

    id: Mapped[int] = mapped_column("id", BigInteger, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column("user_id", BigInteger, ForeignKey("user.id"), nullable=False)
    plant_id: Mapped[int] = mapped_column("plant_id", BigInteger, ForeignKey("plant.id"), nullable=False)

    user: Mapped["User"] = relationship("User", lazy="joined")
    plant: Mapped["Plant"] = relationship("Plant", lazy="joined")


class MedicationHistory(BaseEntity):
    __tablename__ = "medication_history"

    id: Mapped[int] = mapped_column("id", BigInteger, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column("user_id", BigInteger, ForeignKey("user.id"), nullable=False)
    prescription_id: Mapped[int] = mapped_column(
        "prescription_id", BigInteger, ForeignKey("prescription.id"), nullable=False
    )
    medication_time: Mapped[MedicationTime] = mapped_column("medication_time", String(50), nullable=False)

    prescription: Mapped["Prescription"] = relationship("Prescription", lazy="joined")


class Family(BaseEntity):
    __tablename__ = "family"

    id: Mapped[int] = mapped_column("id", BigInteger, primary_key=True, autoincrement=True)
    requester_id: Mapped[int] = mapped_column("requester_id", BigInteger, ForeignKey("user.id"), nullable=False)
    requester_nickname: Mapped[str] = mapped_column("requester_nickname", String(50), nullable=False)
    recipient_id: Mapped[int] = mapped_column("recipient_id", BigInteger, ForeignKey("user.id"), nullable=False)
    recipient_nickname: Mapped[str] = mapped_column("recipient_nickname", String(50), nullable=False)
    requester_allow_view_medication: Mapped[bool] = mapped_column(
        "requester_allow_view_medication", Boolean, nullable=False
    )
    requester_allow_alarm: Mapped[bool] = mapped_column("requester_allow_alarm", Boolean, nullable=False)
    recipient_allow_view_medication: Mapped[bool] = mapped_column(
        "recipient_allow_view_medication", Boolean, nullable=False
    )
    recipient_allow_alarm: Mapped[bool] = mapped_column("recipient_allow_alarm", Boolean, nullable=False)

    requester: Mapped["User"] = relationship(
        "User",
        foreign_keys=[requester_id],
        back_populates="requested_families",
        lazy="joined"
    )
    recipient: Mapped["User"] = relationship(
        "User",
        foreign_keys=[recipient_id],
        back_populates="received_families",
        lazy="joined"
    )
