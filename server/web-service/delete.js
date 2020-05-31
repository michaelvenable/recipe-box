let aws = require('aws-sdk');

aws.config.update({ region: 'us-east-2' });

exports.handler = function (event, context, callback) {
    console.log('Received event to delete a recipe.', event);

    let client = new aws.DynamoDB.DocumentClient();

    let params = {
        TableName: 'Recipes',
        Key: {
            'Name': decodeURI(event.name)
        },
    };

    console.log("Deleting the recipe in DynamoDB.");

    client.delete(params, (err, data) => {
        if (!err) {
            console.log("Response from database:", data);
            callback(null, null);
        } else {
            console.error(err);
            callback(err);
        }
    });
}
