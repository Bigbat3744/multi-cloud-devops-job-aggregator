module "base" {
  source = "./modules/base"

  resource_group_name  = var.resource_group_name
  location             = var.azure_location
  storage_account_name = var.storage_account_name
}

module "queue" {
  source = "./modules/storage_queue"

  queue_name           = "jobqueue"
  storage_account_name = module.base.storage_account_name
}

module "function_app" {
  source = "./modules/function_app"

  function_app_name          = "job-scraper-func"
  resource_group_name        = module.base.resource_group_name
  location                   = var.azure_location
  storage_account_name       = module.base.storage_account_name
  storage_account_access_key = module.base.storage_account_primary_access_key
  storage_connection_string  = module.base.storage_account_connection_string
}

