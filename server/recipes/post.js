const recipes = require('/opt/recipe-repository');

exports.handler = function (recipe, context, callback) {
    console.log("Received request to create a new recipe:", recipe);

    recipes.add(recipe)
    .then(() => callback(null, recipe))
    .catch(err => callback(err));
}