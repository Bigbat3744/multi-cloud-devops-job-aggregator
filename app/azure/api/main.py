from fastapi import FastAPI
from pydantic import BaseModel
import psycopg2
import os

app = FastAPI()

# Pydantic model for incoming job data
class Job(BaseModel):
    title: str
    company: str
    location: str
    source: str
    scraped_at: str

def get_db_connection():
    return psycopg2.connect(
        host=os.getenv("DB_HOST"),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        port="5432"
    )

@app.get("/")
def root():
    return {"message": "Azure API is running"}

@app.post("/jobs")
def insert_job(job: Job):
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO jobs (title, company, location, source, scraped_at)
        VALUES (%s, %s, %s, %s, %s)
    """, (job.title, job.company, job.location, job.source, job.scraped_at))

    conn.commit()
    cur.close()
    conn.close()

    return {"status": "success"}

