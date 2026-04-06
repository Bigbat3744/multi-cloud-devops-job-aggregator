{
  "project": "Multi-Cloud Job Aggregator",
  "description": "A production-grade job aggregation platform deployed on Azure Container Apps using Terraform, Azure Container Registry, Managed Identity, and PostgreSQL Flexible Server.",
  "architecture": {
    "compute": "Azure Container Apps",
    "registry": "Azure Container Registry (ACR)",
    "identity": "User-Assigned Managed Identity for secure ACR pulls",
    "database": "Azure PostgreSQL Flexible Server",
    "iac": "Terraform (AzureRM provider)",
    "containerization": "Docker"
  },
  "key_features": {
    "secure_image_pulls": "Managed Identity + ACR data-plane RBAC (acrpull)",
    "infrastructure_as_code": "Full deployment automated with Terraform",
    "scalable_runtime": "Azure Container Apps with revision management",
    "cloud_native_design": "Stateless API + managed database + container registry"
  },
  "technical_challenges_solved": {
    "acr_rbac": "Implemented both control-plane (AcrPull) and data-plane (acrpull) permissions",
    "registry_identity": "Configured registry identity block required by Container Apps",
    "terraform_state_drift": "Resolved conflicts between manual and IaC-managed role assignments",
    "revision_failures": "Diagnosed and fixed UNAUTHORIZED image pull errors",
    "dependency_cycles": "Eliminated Terraform circular dependencies"
  },
  "deployment_steps": {
    "build_and_push_image": "az acr build -t job-api:v1 -r jobaggregatoracr .",
    "terraform_deploy": [
      "terraform init",
      "terraform apply"
    ],
    "view_logs": "az containerapp logs show --name job-api --resource-group rg-devops-job-aggregator --follow"
  },
  "repository_structure": {
    "api/": "Backend API source code",
    "Dockerfile": "Container build instructions",
    "terraform/": {
      "main.tf": "Core Azure resources",
      "variables.tf": "Input variables",
      "outputs.tf": "Deployment outputs",
      "providers.tf": "AzureRM provider configuration"
    },
    "README.md": "Project documentation"
  },
  "what_i_learned": [
    "Azure Container Apps authentication flow",
    "Control-plane vs data-plane RBAC in ACR",
    "Debugging identity and image pull failures",
    "Designing secure cloud-native architectures",
    "Managing Terraform state and avoiding drift"
  ],
  "next_steps": [
    "Add CI/CD with GitHub Actions",
    "Add monitoring with Azure Monitor",
    "Add health probes and autoscaling",
    "Add frontend UI"
  ]
}
