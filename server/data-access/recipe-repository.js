let aws = require('aws-sdk');

aws.config.update({ region: 'us-east-2' });

module.exports = {
    /**
     * Adds a recipe to the DynamoDb table.
     *
     * @param {object} recipe   Recipe to be added to the repository.
     *
     * @returns {Promise} Promise that resolves if the recipe was added. Promise rejects if 
     */
    add: function (recipe) {
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

        return new Promise((resolve, reject) => {
            db.putItem(params, (err, data) => {
                if (!err) {
                    console.log("Response from database:", data);
                    resolve();
                } else {
                    console.error(err);
                    reject(err);
                }
            });
        });
    }
}