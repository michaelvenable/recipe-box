let aws = require('aws-sdk');

aws.config.update({ region: 'us-east-2' });

// Retrieves a recipe by its name.
exports.handler = function (event, context, callback) {
    let db = new aws.DynamoDB({ apiVersion: '2012-08-10' });

    console.log("input is ", event);

    let params = {
        ExpressionAttributeNames: {
            '#a1': 'Name'
        },
        ExpressionAttributeValues: {
            ":v1": {
                S: decodeURI(event.name)
            }
        },
        TableName: 'Recipes',
        KeyConditionExpression: "#a1 = :v1"
    };

    db.query(params, (err, data) => {
        if (!err) {
            console.log("Response from database:", data);

            let recipes = data.Items.map(r => ({
                name: r.Name.S,
                ingredients: r.Ingredients.L.map(i => i.S),
                steps: r.Steps.L.map(s => s.S)
            }));

            callback(null, recipes[0]);
        } else {
            console.error(err);
            callback(err);
        }
    });
}