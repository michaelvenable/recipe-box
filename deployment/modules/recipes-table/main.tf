resource "aws_dynamodb_table" "recipes" {
    name = var.table_name
    billing_mode = "PAY_PER_REQUEST"

    hash_key = "Name"

    attribute {
        name = "Name"
        type = "S"
    }

    point_in_time_recovery {
        enabled = true
    }
}
