variable "billing_mode" {
    description = "DynamoDB billing mode."
    default     = "PAY_PER_REQUEST"
}

variable "table_name" {
    description = "Name of the database table."
    default     = "Recipes"
}