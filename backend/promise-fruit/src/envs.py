from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Envs(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    DATABASE_USER: str
    DATABASE_PASSWORD: str
    DATABASE_HOST: str
    DATABASE_PORT: str
    DATABASE_DB_NAME: str

    JWT_SECRET_KEY: str
    ACCESS_TOKEN_DURATION_MINUTES: int

    KAKAO_REST_API_KEY: str

    OPENAI_API_KEY: str


@lru_cache
def get_envs() -> Envs:
    return Envs()
