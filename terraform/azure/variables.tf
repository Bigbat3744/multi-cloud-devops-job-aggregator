variable "subscription_id" {
  type = string
}

variable "tenant_id" {
  type = string
}

variable "location" {
  type    = string
  default = "uksouth"
}

variable "resource_group_name" {
  type    = string
  default = "rg-devops-job-aggregator"
}

variable "container_app_name" {
  type    = string
  default = "job-api"
}

variable "postgres_name" {
  type    = string
  default = "jobdb"
}

variable "postgres_password" {
  type      = string
  sensitive = true
}

variable "api_image" {
  type        = string
  default = "jobaggregatoracr.azurecr.io/job-api:v1"
}

variable "acr_name" {
  type    = string
  default = "jobaggregatoracr"
}

variable "container_app_env_name" {
  type    = string
  default = "job-api-env"
}

