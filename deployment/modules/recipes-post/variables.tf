variable "execution_arn" {
    description = "Execution arn of the rest api"
    type        = string
}

variable "layers" {
    description = "List of Lambda Layer Version ARNs (maximum of 5) to attach to your Lambda Function."
    default     = []
}

variable "resource_id" {
    description = "API Gateway resource"
    type        = string
}

variable "rest_api_id" {
    description = "ID of the gateway rest api"
    type        = string
}

variable "role" {
    description = "role arn."
    type        = string
}