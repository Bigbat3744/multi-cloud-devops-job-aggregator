import requests
from bs4 import BeautifulSoup
from datetime import datetime

def scrape_example_jobs():
    url = "https://example.com/jobs"  # replace with real site
    response = requests.get(url, timeout=10)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")

    jobs = []
    for job in soup.select(".job-card"):
        title = job.select_one(".title").get_text(strip=True)
        company = job.select_one(".company").get_text(strip=True)
        location = job.select_one(".location").get_text(strip=True)

        jobs.append({
            "title": title,
            "company": company,
            "location": location,
            "source": "example.com",
            "scraped_at": datetime.utcnow().isoformat() + "Z",
        })

    return jobs

