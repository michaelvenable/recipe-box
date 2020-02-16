output "invoke_url" {
    value = aws_api_gateway_deployment.prod.invoke_url
}

output "recipes_resource_id" {
    value = aws_api_gateway_resource.recipes.id
}

output "recipe_resource_id" {
    value = aws_api_gateway_resource.recipe.id
}

output "rest_api_id" {
    value = aws_api_gateway_rest_api.this.id
}

output "name" {
    value = aws_api_gateway_rest_api.this.name
}

output "execution_arn" {
    value = aws_api_gateway_rest_api.this.execution_arn
}