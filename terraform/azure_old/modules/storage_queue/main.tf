resource "azurerm_storage_queue" "this" {
  name                 = var.queue_name
  storage_account_name = var.storage_account_name
}

