const add = require('/opt/recipe-repository').add;

exports.handler = function (recipe, context, callback) {
    console.log("Received request to create a new recipe:", recipe);
    add(recipe);
}
