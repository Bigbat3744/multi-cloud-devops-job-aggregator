# 🚀 Multi-Cloud Job Aggregator

A production-grade job aggregation platform deployed on Azure Container Apps.

---

## 🧱 Architecture Overview

* **Compute:** Azure Container Apps
* **Registry:** Azure Container Registry (ACR)
* **Identity:** User-Assigned Managed Identity (for secure ACR access)
* **Database:** Azure PostgreSQL Flexible Server
* **Infrastructure as Code:** Terraform (AzureRM provider)
* **Containerization:** Docker

---

## 🔐 Key Features

* Secure image pulls using Managed Identity + ACR RBAC
* Fully automated infrastructure using Terraform
* Stateless API running on Azure Container Apps
* Cloud-native architecture with least-privilege access
* Containerized backend API

---

## 🧩 Technical Challenges Solved

### ✔ ACR Control Plane vs Data Plane RBAC

* Implemented both:

  * `AcrPull` (control plane)
  * `acrpull` (data plane)

---

### ✔ Container Apps Registry Identity

Configured registry access using managed identity:

```hcl
registry {
  server   = azurerm_container_registry.acr.login_server
  identity = azurerm_user_assigned_identity.api_identity.id
}
```

---

### ✔ Terraform State Drift

* Resolved conflicts between manually created and Terraform-managed resources

---

### ✔ Image Pull Authentication Failures

* Diagnosed and fixed `UNAUTHORIZED` errors
* Root cause: missing data-plane RBAC permissions

---

### ✔ Dependency Cycles

* Eliminated Terraform circular dependencies
* Stabilized resource creation order

---

## 🚀 Deployment

### Build and Push Image

```bash
az acr build -t job-api:v1 -r jobaggregatoracr .
```

---

### Deploy Infrastructure

```bash
terraform init
terraform apply
```

---

### View Logs

```bash
az containerapp logs show \
  --name job-api \
  --resource-group rg-devops-job-aggregator \
  --follow
```

---

## 📂 Repository Structure

```text
.
├── api/                  # Backend API source code
├── Dockerfile           # Container build instructions
├── terraform/
│   ├── main.tf          # Core Azure resources
│   ├── variables.tf     # Input variables
│   ├── outputs.tf       # Deployment outputs
│   ├── providers.tf     # AzureRM provider configuration
│   └── versions.tf      # Provider + Terraform version constraints
└── README.md            # Project documentation
```

---

## 🧠 What I Learned

* How Azure Container Apps authenticates to ACR
* The difference between control-plane and data-plane RBAC
* Debugging identity and image pull failures
* Designing secure cloud-native architectures
* Managing Terraform state and avoiding drift

---

## 📌 Summary

This project demonstrates real-world DevOps engineering practices, including:

* Cloud architecture design
* Identity and access management
* Infrastructure automation
* Debugging distributed systems
* Building reliable, production-ready services
