terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
  tenant_id       = var.tenant_id
}

resource "azurerm_resource_group" "rg" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_container_app_environment" "env" {
  name                = var.container_app_env_name
  location            = var.location
  resource_group_name = azurerm_resource_group.rg.name

  workload_profile {
    name = "Consumption"
    workload_profile_type = "Consumption"
  }
}

resource "azurerm_postgresql_flexible_server" "db" {
  name                = var.postgres_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = var.location
  version             = "16"

  administrator_login          = "pgadmin"
  administrator_password        = var.postgres_password
  storage_mb                   = 32768
  sku_name                     = "B_Standard_B1ms"
  backup_retention_days        = 7
  geo_redundant_backup_enabled = false

  lifecycle {
    ignore_changes = [
      zone
    ]
  }
}

resource "azurerm_postgresql_flexible_server_database" "jobs" {
  name      = "jobsdb"
  server_id = azurerm_postgresql_flexible_server.db.id
  charset   = "UTF8"
  collation = "en_US.utf8"
}

resource "azurerm_postgresql_flexible_server_firewall_rule" "allow_azure" {
  name             = "AllowAzure"
  server_id        = azurerm_postgresql_flexible_server.db.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}

resource "azurerm_container_app" "api" {
  name                         = var.container_app_name
  resource_group_name          = azurerm_resource_group.rg.name
  container_app_environment_id = azurerm_container_app_environment.env.id
  revision_mode                = "Single"

  identity {
    type         = "UserAssigned"
    identity_ids = [azurerm_user_assigned_identity.api_identity.id]
  }

  # 🔹 Tell ACA which identity to use for ACR
  registry {
    server   = azurerm_container_registry.acr.login_server
    identity = azurerm_user_assigned_identity.api_identity.id
  }

  template {
    container {
      name   = "api"
      image  = var.api_image
      cpu    = 0.5
      memory = "1Gi"

      env {
        name  = "DB_HOST"
        value = azurerm_postgresql_flexible_server.db.fqdn
      }
      env {
        name  = "DB_NAME"
        value = "jobsdb"
      }
      env {
        name  = "DB_USER"
        value = "pgadmin"
      }
      env {
        name  = "DB_PASSWORD"
        value = var.postgres_password
      }
    }
  }

  ingress {
    external_enabled = true
    target_port      = 8000

    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }
}




resource "azurerm_container_registry" "acr" {
  name                = "jobaggregatoracr"
  resource_group_name = azurerm_resource_group.rg.name
  location            = var.location
  sku                 = "Basic"
  admin_enabled       = true
}



resource "azurerm_user_assigned_identity" "api_identity" {
  name                = "job-api-identity"
  resource_group_name = azurerm_resource_group.rg.name
  location            = var.location
}


