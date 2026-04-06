variable "subscription_id" {
  type = string
  default = "fdc16b3e-f2c3-42f9-995c-c656baa2a8ed"
}

variable "tenant_id" {
  type = string
  default = "582b2317-ebb1-4060-832e-eb391b516f61"
}

variable "azure_location" {
  description = "Azure region to deploy resources into"
  type        = string
  default     = "westeurope"
}

variable "resource_group_name" {
  type        = string
  description = "Name of the Azure resource group"
  default     = "rg-devops-job-aggregator"
}

variable "storage_account_name" {
  type        = string
  description = "Globally unique storage account name"
  default     = "devopsjobsstoruks123"
}

