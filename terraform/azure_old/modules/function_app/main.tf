resource "azurerm_windows_function_app" "this" {
  name                = "job-scraper-func-plan-win"
  location            = var.location
  resource_group_name = var.resource_group_name
  os_type             = "Windows"
  sku_name            = "Y1" # Consumption plan (FREE)
}

resource "azurerm_windows_function_app" "this" {
  name                       = var.function_app_name
  location                   = var.location
  resource_group_name        = var.resource_group_name
  service_plan_id            = azurerm_service_plan.this.id
  storage_account_name       = var.storage_account_name
  storage_account_access_key = var.storage_account_access_key

  site_config {
    application_stack {
      python_version = "3.10"
    }
  }

  app_settings = {
    "AzureWebJobsStorage" = var.storage_connection_string
    "FUNCTIONS_WORKER_RUNTIME" = "python"
  }
}

