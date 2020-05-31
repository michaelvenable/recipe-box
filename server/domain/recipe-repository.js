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
                'Steps': {L: recipe.steps.map(s => ({S: s}))},
                "ImageUrl": {S: recipe.imageUrl}
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
                        steps: r.Steps.L.map(s => s.S),
                        imageUrl: r.ImageUrl == null
                                    ? 'https://orbital-recipe-box-photos.s3.us-east-2.amazonaws.com/missing-photo.png'
                                    : r.ImageUrl.S
                    })).sort((a, b) => a.name.localeCompare(b.name));

                    resolve(recipes);
                } else {
                    console.error(err);
                    reject(err);
                }
            });
        });
    },

    find: function (recipeName) {
        console.log(`Loading recipe named ${recipeName}.`);

        let db = new aws.DynamoDB({ apiVersion: '2012-08-10' });

        let params = {
            ExpressionAttributeNames: {
                '#a1': 'Name'
            },
            ExpressionAttributeValues: {
                ":v1": {
                    S: recipeName
                }
            },
            TableName: 'Recipes',
            KeyConditionExpression: "#a1 = :v1"
        };

        return new Promise((resolve, reject) => {
            db.query(params, (err, data) => {
                if (!err) {
                    console.log("Response from database:", data);

                    let recipes = data.Items.map(r => ({
                        name: r.Name.S,
                        ingredients: r.Ingredients.L.map(i => i.S),
                        steps: r.Steps.L.map(s => s.S),
                        imageUrl: r.ImageUrl.S
                    }));

                    resolve(recipes[0]);
                } else {
                    console.error(err);
                    reject(err);
                }
            });
        });
    },

    /**
     * Updates a recipe in this repository.
     *
     * @returns {Promise} Promise that resolves on success.
     */
    update: function (recipe) {
        console.log('Updating recipe in repository.', recipe);

        let client = new aws.DynamoDB.DocumentClient();

        let params = {
            TableName: 'Recipes',
            Key: {
                'Name': decodeURI(recipe.name)
            },
            UpdateExpression: "set Ingredients = :i, Steps = :s, ImageUrl = :u",
            ExpressionAttributeValues: {
                ":i": recipe.ingredients,
                ":s": recipe.steps,
                ":u": recipe.imageUrl
            },
            ReturnValues: "UPDATED_NEW"
        };

        return new Promise((resolve, reject) => {
            client.update(params, (err, data) => {
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