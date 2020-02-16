let aws = require('aws-sdk');

aws.config.update({ region: 'us-east-2' });

exports.handler = function (event, context, callback) {
    console.log("Received event to update a recipe:", event);

    let client = new aws.DynamoDB.DocumentClient();

    let params = {
        TableName: 'Recipes',
        Key: {
            'Name': decodeURI(event.name)
        },
        UpdateExpression: "set Ingredients = :i, Steps = :s",
        ExpressionAttributeValues: {
            ":i": event.recipe.ingredients,
            ":s": event.recipe.steps
        },
        ReturnValues: "UPDATED_NEW"
    };

    console.log("Updating the recipe in DynamoDB.");

    client.update(params, (err, data) => {
        if (!err) {
            console.log("Response from database:", data);
            callback(null, null);
        } else {
            console.error(err);
            callback(err);
        }
    });
}

