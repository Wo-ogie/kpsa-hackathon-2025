from fastapi import HTTPException, Security
from fastapi.security import APIKeyHeader
from starlette.status import HTTP_401_UNAUTHORIZED

SESSION_COOKIE_NAME = "session_id"
api_key_header = APIKeyHeader(name="X-User-Id", auto_error=False)


class SessionManager:
    def __init__(self):
        self.sessions = {}

    def create_session(self, session_id: str, user_id: int) -> str:
        self.sessions[session_id] = user_id
        return session_id

    def find_session(self, session_id: str) -> int | None:
        return self.sessions.get(session_id)

    def delete_session(self, session_id: str):
        self.sessions.pop(session_id, None)


_session_manager = SessionManager()


def get_session_manager():
    # 항상 같은 인스턴스 반환
    return _session_manager


def get_current_user(
    user_id: int = Security(api_key_header),
) -> int:
    if not user_id:
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )
    try:
        return int(user_id)
    except ValueError:
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail="Invalid user id",
        )
