import os
from contextlib import asynccontextmanager

from fastapi import FastAPI, Depends
from starlette.staticfiles import StaticFiles

from auth_session import get_current_user
from client.base import init_async_client, close_async_client
from router.auth_router import router as auth_router
from router.user_router import router as user_router


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


@app.get("/")
def greet():
    return {"Hello": "World"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
