🚀 Multi‑Cloud Job Aggregator
A production‑grade job aggregation platform deployed on Azure Container Apps, using:
Azure Container Registry (ACR)
User‑Assigned Managed Identity
Azure PostgreSQL Flexible Server
Terraform (Infrastructure‑as‑Code)
Docker
This project demonstrates real DevOps engineering: cloud architecture, identity management, debugging, automation, and infrastructure reliability.
🧱 Architecture Overview
Compute: Azure Container Apps
Registry: Azure Container Registry
Identity: User‑Assigned Managed Identity for secure ACR pulls
Database: Azure PostgreSQL Flexible Server
IaC: Terraform (AzureRM provider)
Containerization: Docker
🔐 Key Features
Secure image pulls using Managed Identity + ACR data‑plane RBAC
Fully automated infrastructure using Terraform
Stateless API running on Azure Container Apps
Cloud‑native architecture with least‑privilege access
Containerized backend API
🧩 Technical Challenges Solved
✔ ACR Control‑Plane vs Data‑Plane RBAC
Implemented both:
AcrPull (control plane)
acrpull (data plane)
✔ Container Apps Registry Identity
Configured the required registry identity block:
hcl
registry {
  server   = azurerm_container_registry.acr.login_server
  identity = azurerm_user_assigned_identity.api_identity.id
}
✔ Terraform State Drift
Resolved conflicts between manually created and IaC‑managed role assignments.
✔ Image Pull Authentication Failures
Diagnosed and fixed UNAUTHORIZED errors caused by missing data‑plane RBAC.
✔ Dependency Cycles
Eliminated Terraform circular dependencies and stabilized the deployment graph.
🚀 Deployment
1. Build and push the image
bash
az acr build -t job-api:v1 -r jobaggregatoracr .
2. Deploy infrastructure
bash
terraform init
terraform apply
3. View logs
bash
az containerapp logs show \
  --name job-api \
  --resource-group rg-devops-job-aggregator \
  --follow
📂 Repository Structure
Code
.
├── api/                     # Backend API source code
├── Dockerfile               # Container build instructions
├── terraform/
│   ├── main.tf              # Core Azure resources
│   ├── variables.tf         # Input variables
│   ├── outputs.tf           # Deployment outputs
│   ├── providers.tf         # AzureRM provider configuration
│   └── versions.tf          # Provider + Terraform version constraints
└── README.md                # Project documentation
🧠 What I Learned
How Azure Container Apps authenticates to ACR
The difference between control‑plane and data‑plane RBAC
Debugging identity and image pull failures
Designing secure cloud‑native architectures
Managing Terraform state and avoiding drift
