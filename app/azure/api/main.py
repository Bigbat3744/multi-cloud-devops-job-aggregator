from fastapi import FastAPI
import boto3
import os

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app = FastAPI()

dynamodb = boto3.resource(
    "dynamodb",
    region_name="eu-west-1",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY")
)

table = dynamodb.Table("job-aggregator-jobs")

@app.get("/health")
def health():
    return {"status": "ok", "service": "azure-job-api"}

@app.get("/jobs")
def get_jobs():
    response = table.scan()
    return response.get("Items", [])

