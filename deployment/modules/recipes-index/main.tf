// Deploy the lambda.
resource "aws_lambda_function" "this" {
    filename      = "../dist/recipes-index.zip"
    function_name = "recipes-index"
    handler       = "index.handler"
    role          = var.role
    layers        = var.layers

    source_code_hash = filebase64sha256("../dist/recipes-index.zip")

    runtime = "nodejs10.x"
}

resource "aws_api_gateway_method" "this" {
    rest_api_id   = var.rest_api_id
    resource_id   = var.resource_id
    http_method   = "GET"
    authorization = "NONE"
}

resource "aws_api_gateway_integration" "this" {
    rest_api_id = var.rest_api_id
    resource_id = var.resource_id
    http_method = aws_api_gateway_method.this.http_method

    integration_http_method = "POST"
    type                    = "AWS"
    uri                     = aws_lambda_function.this.invoke_arn
}

resource "aws_api_gateway_method_response" "this" {
    rest_api_id = var.rest_api_id
    resource_id = var.resource_id
    http_method = aws_api_gateway_integration.this.http_method
    status_code = "200"

    response_parameters = {
        "method.response.header.Access-Control-Allow-Origin" = true
    }
}

resource "aws_api_gateway_integration_response" "this" {
    rest_api_id = var.rest_api_id
    resource_id = var.resource_id
    http_method = aws_api_gateway_integration.this.http_method
    status_code = aws_api_gateway_method_response.this.status_code

    response_parameters = {
        "method.response.header.Access-Control-Allow-Origin" = "'*'"
    }
}

resource "aws_lambda_permission" "this" {
    statement_id  = "AllowExecutionFromAPIGateway"
    action        = "lambda:InvokeFunction"
    function_name = aws_lambda_function.this.function_name
    principal     = "apigateway.amazonaws.com"
    source_arn    = "${var.execution_arn}/*/*/*"
}
