import RecipeBoxDatabase from './RecipeBoxDatabase';

export default class WishlistStore {
  constructor(database) {
    this.database = database || new RecipeBoxDatabase();
  }

  async add(recipe) {
    console.log(`Adding recipe '${recipe.title}' to wishlist.`);

    if (!this.database.isOpen) {
      await this.database.open();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.database.transaction('wishlist', 'readwrite');

      transaction.onerror = function (event) {
        reject(event.target.error);
      }

      const recipes = transaction.objectStore('wishlist');
      recipes.add(recipe);
      resolve();
    });
  }

  async all() {
    console.log('Loading wishlist from the local database.');

    if (!this.database.isOpen) {
      await this.database.open();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.database.transaction('wishlist');

      transaction.onerror = function (event) {
        reject(event.target.error);
      }

      const store = transaction.objectStore('wishlist');
      const request = store.getAll();

      request.onsuccess = async (event) => {
        var recipes = event.target.result;
        console.log(`Loaded ${recipes.length} recipes from the wishlist.`);
        resolve(recipes);
      }
    });
  }

  async remove(recipe) {
  }

  async removeAll() {
  }
}