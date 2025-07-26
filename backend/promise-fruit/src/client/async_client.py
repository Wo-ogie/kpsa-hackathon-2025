import ssl

import httpx
from httpx import AsyncClient


async def log_request(request: httpx.Request):
    print(">>>", request.method, request.url)
    print(">>> headers:", dict(request.headers))
    print(">>> body:", request.content)  # 또는 request.read() 등


_async_client: AsyncClient | None = None


def init_async_client() -> None:
    global _async_client
    if _async_client is not None:
        raise RuntimeError("Async client is already initialized")

    # SSL 컨텍스트 생성 ㅇㅇㄴㅁ및 설정
    ssl_context = ssl.create_default_context()
    ssl_context.check_hostname = False
    ssl_context.verify_mode = ssl.CERT_NONE
    # 더 관대한 SSL 설정
    ssl_context.set_ciphers('DEFAULT@SECLEVEL=1')
    _async_client = AsyncClient(
        verify=ssl_context,
        timeout=30.0,
        limits=httpx.Limits(max_keepalive_connections=5, max_connections=10),
        event_hooks={"request": [log_request]}
    )


async def close_async_client() -> None:
    if _async_client is None:
        raise RuntimeError("Async client has not been initialized")
    await _async_client.aclose()


def get_async_client() -> AsyncClient:
    if _async_client is None:
        raise RuntimeError("Async client has not been initialized")
    return _async_client
