import Axios from 'axios';

import RecipeBoxDatabase from './RecipeBoxDatabase';

class RecipeStore {
  constructor(database) {
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

  async all() {
    console.log('Loading all recipes from the local database.');

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

        if (recipes.length === 0) {
          console.log("There are no recipes stored locally. Downloading from server.");
          await this.syncWithServer();
          recipes = await this.all();
        }

        resolve(recipes);
      }
    });
  }

  async count() {
    if (!this.database.isOpen) {
      await this.database.open();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.database.transaction('recipes');

      transaction.onerror = function (event) {
        reject(event.target.error);
      }

      const recipes = transaction.objectStore('recipes');

      const count = recipes.count();

      count.onerror = function (event) {
        reject(event.target.error);
      }

      count.onsuccess = function (event) {
        resolve(event.target.result);
      }
    });
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

  async syncWithServer() {
    let remoteRecipes = (await Axios.get('/data.json')).data;

    let localRecipes = await this.all();

    // Remove recipes that were deleted from the server.
    for (let i = 0; i < localRecipes.length; i++) {
      const localRecipe = localRecipes[i];
      const remoteRecipe = remoteRecipes.find(r => r.title === localRecipe.title);

      if (remoteRecipe === undefined) {
        localRecipes.splice(i, 1);
      }
    }

    // Update recipes that already exist locally.
    for (let remoteRecipe of remoteRecipes) {
      let localRecipe = localRecipes.find(r => r.title === remoteRecipe.title);

      if (localRecipe !== undefined) {
        Object.assign(localRecipe, remoteRecipe);
      }
    }

    // Add new recipes that do not exist locally.
    for (let remoteRecipe of remoteRecipes) {
      let localRecipe = localRecipes.find(r => r.title === remoteRecipe.title);

      if (localRecipe === undefined) {
        localRecipes.push(remoteRecipe);
      }
    }

    await this.removeAll();
    await this.addMany(localRecipes);
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