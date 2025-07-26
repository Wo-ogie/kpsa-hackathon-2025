import uuid

from fastapi import APIRouter, Depends, Response
from httpx import AsyncClient
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth_session import SessionManager, get_session_manager, SESSION_COOKIE_NAME, get_current_user
from src.client.async_client import get_async_client
from src.database import get_session
from src.entity import User
from src.envs import get_envs, Envs
from src.schema import KakaoLoginRequest, UserResponse, KakaoLoginTokenRequest, SignUpRequest

router = APIRouter(prefix="/api/auth", tags=["auth"])

envs: Envs = get_envs()


@router.get("/sessions")
async def find_sessions(session_manager: SessionManager = Depends(get_session_manager)):
    return {"session": session_manager.sessions}


@router.get("/current-user-id")
def get_current_user_id(
    current_user_id: int = Depends(get_current_user)
):
    return {"user_id": current_user_id}


@router.post(
    path="/login/kakao",
    summary="카카오 로그인",
    description="카카오 로그인합니다. 요청 시, 발급받은 인가코드와 설정한 redirect url이 필요합니다."
                "로그인 성공 시, 로그인한 유저 정보를 응답합니다."
                "로그인 후 받은 유저 ID는 이후 인증/인가가 필요한 API 호출 시 `X-User-Id` header에 담아 요청해야 합니다."
)
async def kakao_login(
    request: KakaoLoginRequest,
    session: AsyncSession = Depends(get_session),
    client: AsyncClient = Depends(get_async_client),
) -> UserResponse:
    # Access token 발행
    response = await client.post(
        url="https://kauth.kakao.com/oauth/token",
        headers={"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
        params={
            "grant_type": "authorization_code",
            "client_id": envs.KAKAO_REST_API_KEY,
            "redirect_uri": request.redirect_url,
            "code": request.authorization_code,
        }
    )
    kakao_access_token: str = response.json()["access_token"]

    # 카카오 유저 정보 조회
    response = await client.get(
        url="https://kapi.kakao.com/v2/user/me",
        headers={
            "Authorization": f"Bearer {kakao_access_token}",
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
    )
    kakao_uid: str = response.json()["id"]

    result = await session.execute(
        select(User).where(User.kakao_uid == kakao_uid)
    )
    user: User | None = result.scalar()

    if user is None:
        user: User = User(
            nickname="",
            phone_number="",
            point=0,
            is_guardian=False,
            kakao_uid=kakao_uid,
            fcm_token="",
        )
        session.add(user)
        await session.commit()
        await session.refresh(user)

    return UserResponse.model_validate(user)


@router.post(path="/login/kakao/token")
async def kakao_token_login(
    request: KakaoLoginTokenRequest,
    session: AsyncSession = Depends(get_session),
    client: AsyncClient = Depends(get_async_client),
) -> UserResponse:
    # 카카오 유저 정보 조회
    response: Response = await client.get(
        url="https://kapi.kakao.com/v2/user/me",
        headers={
            "Authorization": f"Bearer {request.access_token}",
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
    )
    kakao_uid: str = response.json()["id"]

    result = await session.execute(
        select(User).where(User.kakao_uid == kakao_uid)
    )
    user: User | None = result.scalar()

    if user is None:
        user: User = User(
            nickname="",
            phone_number="",
            point=0,
            is_guardian=False,
            kakao_uid=kakao_uid,
            fcm_token="",
        )
        session.add(user)
        await session.commit()
        await session.refresh(user)

    return UserResponse.model_validate(user)


@router.post(
    path="/signup",
    summary="회원가입"
)
async def signup(
    request: SignUpRequest,
    current_user: int = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    result = await session.execute(
        select(User).where(User.id == current_user)
    )
    user: User = result.scalar()

    user.nickname = request.nickname
    user.phone_number = request.phone_number
    user.is_guardian = request.is_guardian
    await session.commit()
    await session.refresh(user)

    return UserResponse.model_validate(user)


async def _create_session_and_set_cookie(response: Response, session_manager: SessionManager, user: User) -> str:
    session_id: str = str(uuid.uuid4())
    session_manager.create_session(session_id, user.id)
    response.set_cookie(
        key=SESSION_COOKIE_NAME,
        value=session_id,
        httponly=True,
        max_age=3600,
        samesite="lax",
        secure=False,
        path="/"
    )
    return session_id
