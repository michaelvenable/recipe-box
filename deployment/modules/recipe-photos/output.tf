output "arn" {
    description = "ARN of the new bucket."
    value = aws_s3_bucket.this.arn
}