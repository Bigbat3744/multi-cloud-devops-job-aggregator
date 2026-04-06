# 🚀 Multi-Cloud DevOps Job Aggregator

A **production-grade, multi-cloud platform** that ingests, processes, and serves job listings across **AWS and Azure**, built with Infrastructure-as-Code, containerization, and CI/CD.

---

## 💡 Project Overview

This project demonstrates **real-world DevOps engineering** by designing and deploying a **scalable, secure, multi-cloud architecture**:

* **AWS** → Serverless job ingestion (Lambda, API Gateway, DynamoDB)
* **Azure** → Containerized API + frontend hosting (Container Apps, ACR, PostgreSQL)
* **Terraform** → End-to-end infrastructure automation
* **Docker + GitHub Actions** → CI/CD and container delivery

---

## 🧱 Architecture (High Level)

```text
Job Sources → AWS Lambda → DynamoDB → (Data Pipeline) → Azure API → PostgreSQL → Frontend
```

### 🔹 AWS Layer (Ingestion)

* Lambda functions scrape job data from external sources
* API Gateway exposes ingestion endpoints
* DynamoDB stores raw job data
* S3 stores logs and artifacts

### 🔹 Azure Layer (Serving)

* Containerized API runs on Azure Container Apps
* Azure Container Registry stores Docker images
* PostgreSQL stores processed job listings
* Static frontend hosted via Azure

---

## 🔐 Key Highlights

* ✅ **Multi-cloud architecture** (AWS + Azure integration)
* ✅ **Secure container deployment** using Managed Identity + ACR RBAC
* ✅ **Serverless ingestion pipeline** with AWS Lambda
* ✅ **Containerized API** deployed via Azure Container Apps
* ✅ **Hybrid database design** (DynamoDB + PostgreSQL)
* ✅ **Fully automated infrastructure** using Terraform
* ✅ **CI/CD pipeline** with GitHub Actions

---

## 🧩 Technical Impact

### 🔹 Identity & Security

* Implemented **least-privilege access** using IAM and Managed Identity
* Solved ACR authentication using **control-plane + data-plane RBAC**

---

### 🔹 Infrastructure Automation

* Built complete environments using **Terraform (AzureRM + AWS providers)**
* Resolved **state drift and dependency cycles** in production workflows

---

### 🔹 Debugging & Reliability

* Diagnosed and fixed:

  * Container image pull failures (`UNAUTHORIZED`)
  * Terraform dependency cycles
  * Cross-cloud integration issues

---

### 🔹 CI/CD Engineering

* Automated:

  * Docker image build
  * Push to Azure Container Registry
  * Terraform deployment
  * Container App updates

---

## 🚀 Deployment (Quick Start)

```bash
# AWS Infrastructure
cd terraform/aws
terraform init && terraform apply

# Azure Infrastructure
cd terraform/azure
terraform init && terraform apply

# Build & Push API Image
az acr build -t job-api:v1 -r jobaggregatoracr .

# View Logs
az containerapp logs show \
  --name job-api \
  --resource-group rg-devops-job-aggregator \
  --follow
```

---

## 📂 Project Structure

```text
.
├── api/                     # Backend API
├── frontend/                # Frontend UI
├── Dockerfile               # Container build config
├── terraform/
│   ├── aws/                 # AWS infrastructure
│   └── azure/               # Azure infrastructure
├── .github/workflows/       # CI/CD pipelines
└── README.md
```

---

## 🧠 Skills Demonstrated

* Multi-cloud architecture design (AWS + Azure)
* Terraform (Infrastructure-as-Code)
* Docker & container orchestration
* Azure Container Apps & AWS Lambda
* Identity & access management (IAM, Managed Identity, RBAC)
* CI/CD with GitHub Actions
* Debugging distributed cloud systems

---

## 📈 Future Enhancements

* Add job filtering (location, role, remote)
* Implement autoscaling policies
* Add monitoring (Azure Monitor + CloudWatch)
* Introduce caching layer (Redis)
* Add user authentication

---

## 📌 Why This Project Matters

This project reflects **real-world DevOps challenges and solutions**, including:

* Designing **secure, scalable cloud systems**
* Managing **cross-cloud infrastructure**
* Automating deployments end-to-end
* Debugging complex distributed environments

---

## 👤 Olaitan Soyoye


