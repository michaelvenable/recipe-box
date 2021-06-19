module "website" {
    source = "./modules/website"
    bucket = "orbital-recipe-box"
}

module "recipe_photos" {
    source = "./modules/recipe-photos"
    bucket = "orbital-recipe-box-photos"
}