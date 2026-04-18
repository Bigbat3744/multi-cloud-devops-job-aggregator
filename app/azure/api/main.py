from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import boto3
import os

app = FastAPI()

# ============================
# CORS (Correct placement)
# ============================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins for now
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================
# DynamoDB
# ============================
dynamodb = boto3.resource(
    "dynamodb",
    region_name="eu-west-1",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY")
)

table = dynamodb.Table("job-aggregator-jobs")

# ============================
# Routes
# ============================
@app.get("/health")
def health():
    return {"status": "ok", "service": "azure-job-api"}

from fastapi import Query

@app.get("/jobs")
def get_jobs(query: str = Query(default="")):
    response = table.scan()
    items = response.get("Items", [])
    if query:
        items = [j for j in items if query.lower() in j.get("title", "").lower()]
    return items
