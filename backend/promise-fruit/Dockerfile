FROM python:3.13-slim

ENV TZ=Asia/Seoul

WORKDIR /app

# 한국 시간 설정을 위한 tzdata 설치
RUN apt-get update && apt-get install -y tzdata \
    && ln -sf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone \
    && pip install --upgrade pip && pip install poetry \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY pyproject.toml poetry.lock* README.md /app/

RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-root

COPY . /app

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]