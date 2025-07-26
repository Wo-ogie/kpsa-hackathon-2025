import logging
import os
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.staticfiles import StaticFiles

from src.client.async_client import init_async_client, close_async_client
from src.router.auth_router import router as auth_router
from src.router.drug_router import router as drug_router
from src.router.family_router import router as family_router
from src.router.medication_router import router as medication_router
from src.router.plant_router import router as plant_router
from src.router.prescription_router import router as prescription_router
from src.router.user_router import router as user_router

logging.basicConfig(level=logging.DEBUG)

logger = logging.getLogger("api-logger")
logging.getLogger("httpx").setLevel(logging.DEBUG)
logging.getLogger("httpcore").setLevel(logging.DEBUG)


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_async_client()

    yield

    await close_async_client()


app = FastAPI(lifespan=lifespan)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(prescription_router)
app.include_router(drug_router)
app.include_router(plant_router)
app.include_router(medication_router)
app.include_router(family_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:8000", "http://1.201.18.170:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # 요청 정보 로깅
        req_body = await request.body()
        logger.info(
            f"Request: {request.method} {request.url} "
            f"Headers: {dict(request.headers)} "
            f"Body: {req_body.decode('utf-8', 'ignore')}"
        )
        # 응답 정보 로깅
        response = await call_next(request)
        resp_body = b""
        async for chunk in response.body_iterator:
            resp_body += chunk

        logger.info(
            f"Response: {request.method} {request.url} "
            f"Status: {response.status_code} "
            f"Body: {resp_body.decode('utf-8', 'ignore')}"
        )
        # 응답 본문 재설정
        return Response(
            content=resp_body,
            status_code=response.status_code,
            headers=dict(response.headers),
            media_type=response.media_type,
        )


app.add_middleware(LoggingMiddleware)


@app.get("/")
def greet():
    return {"Hello": "World"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
