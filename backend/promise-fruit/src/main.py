import logging
import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.staticfiles import StaticFiles

from src.client.async_client import init_async_client, close_async_client
from src.router.auth_router import router as auth_router
from src.router.drug_router import router as drug_router
from src.router.prescription_router import router as prescription_router
from src.router.user_router import router as user_router

logging.basicConfig(level=logging.DEBUG)

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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 오리진 허용
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드 허용
    allow_headers=["*"],  # 모든 HTTP 헤더 허용
)


@app.get("/")
def greet():
    return {"Hello": "World"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
