import Axios from 'axios';

import RecipeBoxDatabase from './RecipeBoxDatabase';

class RecipeStore {
  constructor(database = undefined) {
    this.database = database || new RecipeBoxDatabase();
  }

  /**
   * Adds a recipe to this database.
   */
  async add(recipe) {
    console.log(`Adding recipe '${recipe.title}' to database.`);

    if (!this.database.isOpen) {
      await this.database.open();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.database.transaction('recipes', 'readwrite');

      transaction.onerror = function (event) {
        reject(event.target.error);
      }

      const recipes = transaction.objectStore('recipes');
      recipes.add(recipe);
      resolve();
    });
  }

  async addMany(newRecipes) {
    console.log(`Adding ${newRecipes.length} recipes.`);

    if (!this.database.isOpen) {
      await this.database.open();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.database.transaction('recipes', 'readwrite');

      transaction.onerror = function (event) {
        reject(event.target.error);
      }

      const recipes = transaction.objectStore('recipes');

      for (let recipe of newRecipes) {
        recipes.add(recipe);
      }

      transaction.oncomplete = function () {
        resolve();
      }
    });
  }

  /**
   * Retrieves all recipes from the store, first by loading recipes from Local Storage. If no recipes are found in
   * Local Storage, then recipes are loaded from the server and saved in Local Storage.
   */
  async all() {
      let recipes = await this.loadAllFromLocalStorage();

      if (recipes.length === 0) {
        console.log("There are no recipes in Local Storage. Downloading from server.");
        recipes = await this.syncWithServer();
      }

      return recipes;
  }

  async loadAllFromLocalStorage() {
    console.log('Loading all recipes from Local Storage.');

    if (!this.database.isOpen) {
      await this.database.open();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.database.transaction('recipes', 'readwrite');

      transaction.onerror = function (event) {
        reject(event.target.error);
      }

      const store = transaction.objectStore('recipes');
      const request = store.getAll();

      request.onsuccess = async (event) => {
        var recipes = event.target.result;
        console.log(`Loaded ${recipes.length} recipes.`);
        resolve(recipes);
      }
    });
  }

  async count() {
    return (await this.loadAllFromLocalStorage()).count;
  }

  /**
   * Finds a recipe by the case-sensitive title. Returns undefined if no recipe matches the title.
   */
  async findByTitle(title) {
    if (!this.database.isOpen) {
      await this.database.open();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.database.transaction('recipes');
      const store = transaction.objectStore('recipes');

      let request = store.get(title);

      request.onsuccess = event => {
        resolve(event.target.result);
      };

      request.onerror = event => {
        reject(event.target.result);
      };
    });
  }

  async removeAll() {
    console.log('Removing all recipes from database.');

    if (!this.database.isOpen) {
      await this.database.open();
    }

    return new Promise((resolve, reject) => {
      const request =
        this.database
          .transaction('recipes', 'readwrite')
          .objectStore('recipes')
          .clear();

      request.onsuccess = () => resolve();
      request.onerror = error => reject(error);
    });
  }

  /**
   * Updates the recipes in Local Storage with any changes found on the server. This sync method avoids completely
   * overwriting the local recipe, since that would mean losing any local changes, like the user's meal history.
   *
   * @returns {Recipe[]}    The complete list of new recipes.
   */
  async syncWithServer() {
    console.log('Syncing recipes with server...');
    let remoteRecipes = (await Axios.get('/data.json')).data;

    let localRecipes = await this.loadAllFromLocalStorage();

    // Remove recipes that were deleted from the server.
    for (let i = 0; i < localRecipes.length; i++) {
      const localRecipe = localRecipes[i];
      const remoteRecipe = remoteRecipes.find(r => r.title === localRecipe.title);

      if (remoteRecipe === undefined) {
        localRecipes.splice(i, 1);
      }
    }

    // Update recipes that already exist locally. Do not replace the entire object, because that would remove
    // properties that are added by the client application, like when the recipe was last cooked.
    for (let remoteRecipe of remoteRecipes) {
      let localRecipe = localRecipes.find(r => r.title === remoteRecipe.title);

      if (localRecipe !== undefined) {
        localRecipe.title = remoteRecipe.title;
        localRecipe.ingredients = remoteRecipe.ingredients;
        localRecipe.directions = remoteRecipe.directions;
        localRecipe.photo = remoteRecipe.photo;
        localRecipe.tags = remoteRecipe.tags;
      }
    }

    // Add new recipes that do not exist locally.
    for (let remoteRecipe of remoteRecipes) {
      let localRecipe = localRecipes.find(r => r.title === remoteRecipe.title);

      if (localRecipe === undefined) {
        localRecipes.push(remoteRecipe);
      }
    }

    console.log('The merged recipes.', localRecipes);

    await this.removeAll();
    await this.addMany(localRecipes);

    return localRecipes;
  }

  async update(recipe) {
    console.log('Updating recipe:', recipe);

    if (!this.database.isOpen) {
      await this.database.open();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.database.transaction('recipes', 'readwrite');
      const store = transaction.objectStore('recipes');

      let request = store.put(recipe);

      request.onsuccess = () => resolve();
      request.onerror = () => reject();
    });
  }
}

export default RecipeStore;