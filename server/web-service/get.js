const recipes = require('/opt/recipe-repository');

// Retrieves a recipe by its name.
exports.handler = function (event, context, callback) {
    recipes.find(decodeURI(event.name))
    .then(recipe => callback(null, recipe))
    .catch(callback);
}