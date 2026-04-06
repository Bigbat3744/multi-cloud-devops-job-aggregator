output "storage_account_primary_access_key" {
  value = azurerm_storage_account.this.primary_access_key
}

output "storage_account_connection_string" {
  value = azurerm_storage_account.this.primary_connection_string
}

