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
          recipes = (await Axios.get('/data.json')).data;

          // Add a 'tags' property if missing for backwards compatibilty.
          for (let recipe of recipes) {
            recipe.tags = recipe.tags || [];
          }

          console.log(`Adding ${recipes.length} to the local database.`);
          await this.addMany(recipes);
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

  async findByTitle(title) {
    console.log(`Searching for recipe "${title}".`);
    const match = (await this.all()).find(r => r.title === title);
    console.log('Found:', match);
    return match;
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
}

export default RecipeStore;