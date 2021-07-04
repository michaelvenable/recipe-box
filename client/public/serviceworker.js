console.log('registering sync event.');

self.addEventListener('sync',
  async event => {
    console.log("Received sync event.");

    if (event.tag === 'fetch-recipes') {
      console.log('Fetching latest recipes from the server.');

      event.waitUntil(async () => {
        const downloadedRecipes = (await Axios.get('/data.json')).data;

        const recipes = new RecipeStore();
        await recipes.removeAll();
        recipes.addMany(downloadedRecipes);
      });
    }
  }
);


