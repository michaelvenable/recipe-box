const recipes = require('/opt/recipe-repository');

exports.handler = function (input, context, callback) {
    recipes.all()
    .then(allRecipes => callback(null, allRecipes))
    .catch(callback);
}