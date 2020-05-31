module "recipes_table" {
    source = "./modules/recipes-table"
}

# Create a role that will be shared by all Lambdas in the web service.
resource "aws_iam_role" "lambda" {
  name = "role-recipe-box-2"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "full_access" {
  role       = aws_iam_role.lambda.name
  policy_arn = "arn:aws:iam::aws:policy/AWSLambdaFullAccess"
}

module "api_gateway" {
    source = "./modules/api-gateway"
}

module "server_domain" {
    source = "./modules/server-domain"
}

module "recipes_index" {
    source = "./modules/recipes-index"

    role          = aws_iam_role.lambda.arn
    rest_api_id   = module.api_gateway.rest_api_id
    resource_id   = module.api_gateway.recipes_resource_id
    execution_arn = module.api_gateway.execution_arn
    layers        = [module.server_domain.arn]
}

module "recipes_post" {
    source = "./modules/recipes-post"

    role          = aws_iam_role.lambda.arn
    rest_api_id   = module.api_gateway.rest_api_id
    resource_id   = module.api_gateway.recipes_resource_id
    execution_arn = module.api_gateway.execution_arn
    layers        = [module.server_domain.arn]
}

module "recipes_get" {
    source = "./modules/recipes-get"

    role          = aws_iam_role.lambda.arn
    rest_api_id   = module.api_gateway.rest_api_id
    resource_id   = module.api_gateway.recipe_resource_id
    execution_arn = module.api_gateway.execution_arn
    layers        = [module.server_domain.arn]
}

module "recipes_put" {
    source = "./modules/recipes-put"

    role          = aws_iam_role.lambda.arn
    rest_api_id   = module.api_gateway.rest_api_id
    resource_id   = module.api_gateway.recipe_resource_id
    execution_arn = module.api_gateway.execution_arn
    layers        = [module.server_domain.arn]
}

module "recipes_delete" {
    source = "./modules/recipes-delete"

    role          = aws_iam_role.lambda.arn
    rest_api_id   = module.api_gateway.rest_api_id
    resource_id   = module.api_gateway.recipe_resource_id
    execution_arn = module.api_gateway.execution_arn
}

module "recipes_cors" {
    source      = "./modules/cors"
    rest_api_id = module.api_gateway.rest_api_id
    resource_id = module.api_gateway.recipes_resource_id
}

module "recipe_cors" {
    source      = "./modules/cors"
    rest_api_id = module.api_gateway.rest_api_id
    resource_id = module.api_gateway.recipe_resource_id
}

module "website" {
    source = "./modules/website"
    bucket = "orbital-recipe-box"
}

module "recipe_photos" {
    source = "./modules/recipe-photos"
    bucket = "orbital-recipe-box-photos"
}