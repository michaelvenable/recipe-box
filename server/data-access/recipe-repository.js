let aws = require('aws-sdk');

aws.config.update({ region: 'us-east-2' });

module.exports = {
    /**
     * Adds a recipe to the DynamoDb table.
     *
     * @param {object} recipe   Recipe to be added to the repository.
     *
     * @returns {Promise} Promise that resolves if the recipe was added. Promise rejects if recipes cannot be
     *                    added.
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
    },

    /**
     * Retrieves all recipes from the repository.
     *
     * @returns {Promise<object[]>} All recipes sorted alphabetically by name.
     */
    all: function () {
        console.log("Loading all recipes from DynamoDB.");

        let db = new aws.DynamoDB({ apiVersion: '2012-08-10' });

        let params = {
            TableName: 'Recipes',
            Select: "ALL_ATTRIBUTES"
        };

        return new Promise((resolve, reject) => {
            db.scan(params, (err, data) => {
                if (!err) {
                    console.log("Response from database:", data);

                    let recipes = data.Items.map(r => ({
                        name: r.Name.S,
                        ingredients: r.Ingredients.L.map(i => i.S),
                        steps: r.Steps.L.map(s => s.S)
                    })).sort((a, b) => a.name.localeCompare(b.name));

                    resolve(recipes);
                } else {
                    console.error(err);
                    reject(err);
                }
            });
        });
    }
}