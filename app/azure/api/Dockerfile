FROM python:3.10-slim

WORKDIR /app

COPY app/azure/api/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app/azure/api . 

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
