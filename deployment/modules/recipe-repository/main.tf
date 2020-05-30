resource "aws_lambda_layer_version" "this" {
    description = "Provides storage and retrieval of recipes."
    layer_name  = "recipe-repository"

    filename            = "../dist/recipe-repository.zip"
    source_code_hash    = filebase64sha256("../dist/recipe-repository.zip")

    compatible_runtimes = ["nodejs10.x"]
}