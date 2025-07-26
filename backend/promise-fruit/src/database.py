from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

from envs import get_envs, Envs

envs: Envs = get_envs()

DATABASE_URL = (
    "mysql+aiomysql://"
    f"{envs.DATABASE_USER}:{envs.DATABASE_PASSWORD}@{envs.DATABASE_HOST}:{envs.DATABASE_PORT}/{envs.DATABASE_DB_NAME}"
)
engine = create_async_engine(DATABASE_URL, echo=True)
session_factory = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)


async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with session_factory() as session:
        yield session
