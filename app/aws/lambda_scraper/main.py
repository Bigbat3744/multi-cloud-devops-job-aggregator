import json
import logging
from scraper import scrape_example_jobs

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def handler(event, context):
    logger.info("Scraper started")

    jobs = scrape_example_jobs()

    logger.info("Scraped %d jobs", len(jobs))
    logger.info(json.dumps(jobs, indent=2))

    # TODO: send to Azure API

    return {
        "statusCode": 200,
        "body": json.dumps({"jobs_count": len(jobs)})
    }

