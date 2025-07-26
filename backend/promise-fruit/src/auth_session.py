from fastapi import HTTPException, Security, Depends
from fastapi.security import APIKeyCookie

SESSION_COOKIE_NAME = "session_id"
API_KEY_COOKIE = APIKeyCookie(name=SESSION_COOKIE_NAME)


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
    session_id: str = Security(API_KEY_COOKIE),
    session_manager: SessionManager = Depends(get_session_manager)
) -> int:
    if not session_id:
        raise HTTPException(status_code=401, detail="Not authenticated")
    user_id: int | None = session_manager.find_session(session_id)
    if not user_id:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return user_id
