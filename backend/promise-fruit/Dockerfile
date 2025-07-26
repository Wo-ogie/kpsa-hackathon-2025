FROM python:3.13-slim

WORKDIR /app

RUN pip install --upgrade pip && pip install poetry

COPY pyproject.toml poetry.lock* README.md /app/

RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-root

COPY . /app

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]