# Create a role to allow API gateway to write to cloudwatch.
resource "aws_iam_role" "api_gateway_role" {
  name = "recipes-api-gateway-role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "apigateway.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_policy_attachment" "this" {
  name = "test-attachment"
  roles = ["${aws_iam_role.api_gateway_role.name}"]
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs"
}

resource "aws_iam_role_policy" "cloudwatch" {
  name = "default"
  role = aws_iam_role.api_gateway_role.id

  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:DescribeLogGroups",
                "logs:DescribeLogStreams",
                "logs:PutLogEvents",
                "logs:GetLogEvents",
                "logs:FilterLogEvents"
            ],
            "Resource": "*"
        }
    ]
}
EOF
}

resource "aws_api_gateway_account" "this" {
  cloudwatch_role_arn = aws_iam_role.api_gateway_role.arn
}

resource "aws_api_gateway_rest_api" "this" {
    name        = "RecipeBox"
    description = "Maintain a collection of your favorite recipes."
}

resource "aws_api_gateway_resource" "recipes" {
    rest_api_id = aws_api_gateway_rest_api.this.id
    parent_id   = aws_api_gateway_rest_api.this.root_resource_id
    path_part   = "recipes"
}

// Create a resource for /recipes/{name}
resource "aws_api_gateway_resource" "recipe" {
    rest_api_id = aws_api_gateway_rest_api.this.id
    parent_id   = aws_api_gateway_resource.recipes.id
    path_part   = "{name}"
}

// Deploy.
resource "aws_api_gateway_deployment" "prod" {
  rest_api_id = aws_api_gateway_rest_api.this.id
  stage_name = "prod"
}