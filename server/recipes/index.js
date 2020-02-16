let aws = require('aws-sdk');

aws.config.update({ region: 'us-east-2' });

exports.handler = function (input, context, callback) {
    let db = new aws.DynamoDB({ apiVersion: '2012-08-10' });

    let params = {
        TableName: 'Recipes',
        Select: "ALL_ATTRIBUTES"
    };

    db.scan(params, (err, data) => {
        if (!err) {
            console.log("Response from database:", data);

            let recipes = data.Items.map(r => ({
                name: r.Name.S,
                ingredients: r.Ingredients.L.map(i => i.S),
                steps: r.Steps.L.map(s => s.S)
            }));

            callback(null, recipes);
        } else {
            console.error(err);
            callback(err);
        }
    });
}