output "arn" {
    description = "The ARN of the Lambda Layer with version."
    value       = aws_lambda_layer_version.this.arn
}