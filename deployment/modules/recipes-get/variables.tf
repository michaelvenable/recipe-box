variable "role" {
    description = "role arn."
    type        = "string"
}

variable "rest_api_id" {
    description = "ID of the gateway rest api"
    type        = "string"
}

variable "resource_id" {
    description = "API Gateway resource"
    type        = "string"
}

variable "execution_arn" {
    description = "Execution arn of the rest api"
    type        = "string"
}