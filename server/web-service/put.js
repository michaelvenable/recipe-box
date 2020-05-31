const recipes = require('/opt/recipe-repository');

exports.handler = function (event, context, callback) {
    console.log("Received event to update a recipe:", event);

    recipes.update(event.recipe)
    .then(() => callback(null, null))
    .catch(callback);
}
