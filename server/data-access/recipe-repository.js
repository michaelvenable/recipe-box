let aws = require('aws-sdk');

aws.config.update({ region: 'us-east-2' });

module.exports.add = function(recipe) {
    console.log("Adding recipe to DynamoDb.", recipe);

    let db = new aws.DynamoDB({ apiVersion: '2012-08-10' });

    let params = {
        TableName: 'Recipes',
        Item: {
            'Name': {S: recipe.name},
            'Ingredients': {L: recipe.ingredients.map(s => ({S: s}))},
            'Steps': {L: recipe.steps.map(s => ({S: s}))}
        }
    };

    db.putItem(params, (err, data) => {
        if (!err) {
            console.log("Response from database:", data);
            callback(null, recipe);
        } else {
            console.error(err);
            callback(err);
        }
    });
}