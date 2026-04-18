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

