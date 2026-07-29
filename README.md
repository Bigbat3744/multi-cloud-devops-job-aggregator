# 🌐 Multi-Cloud Job Aggregator

[![Azure](https://img.shields.io/badge/Azure-Container_Apps-blue?logo=microsoft-azure)](https://azure.microsoft.com)
[![AWS](https://img.shields.io/badge/AWS-DynamoDB_+_S3-orange?logo=amazon-aws)](https://aws.amazon.com)
[![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green?logo=fastapi)](https://fastapi.tiangolo.com)
[![Live Demo](https://img.shields.io/badge/Live-Demo-success)](http://job-aggregator-frontend.s3-website-eu-west-1.amazonaws.com)

> **Production-grade multi-cloud job aggregation platform**

**[Architecture](#-architecture)** | **[Challenges Solved](#-engineering-challenges-solved)** — *(live demo currently paused, see below)*

# 🌐 Multi‑Cloud Job Aggregator — Azure Container Apps + AWS DynamoDB + S3 Frontend

A production‑grade, multi‑cloud job aggregation platform designed and built to demonstrate real DevOps engineering capability.  
This project integrates **Azure Container Apps**, **AWS DynamoDB**, **AWS S3**, and a **FastAPI backend** to deliver a scalable, cost‑efficient job search experience.

---

## 🚀 Overview

This application aggregates job listings from external sources, stores them in DynamoDB, and exposes them through a FastAPI backend deployed on Azure Container Apps.  
A lightweight, responsive frontend is hosted on AWS S3 and communicates directly with the backend API.

The architecture is intentionally multi‑cloud to reflect modern distributed systems and real‑world DevOps workflows.

---

## 🏗️ Architecture

┌─────────────────────────────────────────────────────────────┐
│                      User's Browser                          │
└────────────────────────┬────────────────────────────────────┘
│
▼
┌───────────────────────────────┐
│   Frontend (AWS S3)           │
│   - Static HTML/CSS/JS        │
│   - CORS-enabled              │
└───────────────┬───────────────┘
│ HTTPS
▼
┌───────────────────────────────┐
│   Backend (Azure)             │
│   - Azure Container Apps      │
│   - FastAPI                   │
│   - CORS middleware           │
└───────────────┬───────────────┘
│ AWS SDK
▼
┌───────────────────────────────┐
│   Database (AWS)              │
│   - DynamoDB                  │
│   - Job listings storage      │
└───────────────────────────────┘

### **Frontend**
- Static HTML/CSS/JavaScript
- Hosted on **AWS S3 Static Website Hosting**
- CORS‑enabled for cross‑origin API access
- Clean, minimal UI for job search and display

### **Backend**
- **FastAPI** application
- Deployed on **Azure Container Apps**
- CORS middleware configured for secure cross‑origin requests
- `/jobs` endpoint returns job listings from DynamoDB
- `/health` endpoint for monitoring and readiness checks

### **Database**
- **AWS DynamoDB**
- Stores job listings ingested from external APIs
- Designed for low‑latency reads and cost‑efficient scaling

---

## 🧩 Key Features

- 🔍 Search for jobs by keyword  
- 📄 Clean job cards with direct links to application pages  
- ☁️ Multi‑cloud deployment (Azure + AWS)  
- ⚡ FastAPI backend with proper CORS configuration  
- 🗄️ DynamoDB storage for job listings  
- 🌐 S3‑hosted frontend with instant global availability  
- 🛠️ Debug‑driven development: revision management, CORS resolution, container restarts, and API integration  
- 🧪 Local + staging environment parity  

---

## 🧠 Engineering Challenges Solved

This project intentionally demonstrates real DevOps problem‑solving:

### **1. Azure Container Apps Revision Management**
- Identified and resolved unhealthy revisions  
- Switched traffic between revisions  
- Restarted and deployed new revisions during debugging  

### **2. CORS Failures Between S3 and Azure**
- Diagnosed missing CORS headers  
- Fixed duplicate FastAPI app instances  
- Corrected middleware placement  
- Ensured correct app entrypoint for Azure runtime  

### **3. Frontend → Backend Integration**
- Implemented safe fetch logic with sanitization  
- Added loading/error states  
- Ensured correct API routing and query handling  

### **4. Multi‑Cloud Deployment**
- Backend on Azure  
- Database on AWS  
- Frontend on AWS S3  
- Clean separation of environments (local, staging, production)  

---

## 📦 Project Structure

/frontend
├── index.html
├── style.css
└── app.js
/backend
├── main.py
├── requirements.txt
└── Dockerfile


---

## 🔧 Backend Endpoints

### `GET /health`
Returns service status.

### `GET /jobs?query=keyword`
Returns job listings filtered by keyword.

---

## 🚀 Deployment Summary

### **Azure Container Apps**
- Containerized FastAPI backend  
- Environment variables for AWS credentials  
- Revision‑based deployment  
- Ingress enabled for public API access  

### **AWS DynamoDB**
- Single table for job listings  
- On‑demand capacity mode  

### **AWS S3**
- Static website hosting enabled  
- Public bucket policy  
- CORS configuration for API access  

---

### Run It Yourself (Live Demo Currently Paused)

The Azure backend was decommissioned after trial credits expired — a real example of the cost-management tradeoffs that come with multi-cloud deployments (Azure trial subscriptions lock after ~30 days regardless of whether usage stayed within free-tier limits). Run the full stack locally in under 5 minutes:

\`\`\`
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
# open frontend/index.html in your browser, pointed at http://localhost:8000
\`\`\`

### API Usage

```bash
# Health check
curl https://YOUR_AZURE_APP.azurecontainerapps.io/health

# Search jobs
curl "https://YOUR_AZURE_APP.azurecontainerapps.io/jobs?query=devops"
```

### Local Development

```bash
# Clone repository
git clone https://github.com/Bigbat3744/multi-cloud-devops-job-aggregator
cd multi-cloud-devops-job-aggregator

# Run backend locally
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Access at http://localhost:8000
```
````

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | HTML/CSS/JavaScript | User interface |
| **Hosting** | AWS S3 Static Website | Global content delivery |
| **Backend** | FastAPI (Python) | REST API server |
| **Compute** | Azure Container Apps | Serverless container hosting |
| **Database** | AWS DynamoDB | NoSQL job storage |
| **Security** | CORS, AWS IAM | Cross-origin & access control |
| **Deployment** | Docker, Azure CLI, AWS CLI | Container & cloud deployment |
````

## 💰 Cost Analysis

**Monthly Operating Cost:** ~$5-10

| Service | Usage | Cost |
|---------|-------|------|
| Azure Container Apps | Serverless, scales to zero | $0-5 (free tier: 180,000 vCPU-seconds) |
| AWS DynamoDB | On-demand, <1GB data | $0-2 (25 GB free tier) |
| AWS S3 | Static hosting, <5GB | $0-1 (5 GB free tier) |

**Total:** Minimal cost with smart architecture choices
````


## 📈 Future Enhancements

- Experience‑based filtering (e.g., ≤ 2 years experience)  
- Automatic job page parsing  
- Tailored application responses generated per job  
- One‑click “Apply” workflow  
- CI/CD pipeline for S3 + Azure deployments  
- CloudFront CDN integration (optional)  

---

## 🧑‍💻 Author

Olaitan 
DevOps & Cloud Engineer  
Focused on multi‑cloud architecture, automation, and production‑grade deployments.

