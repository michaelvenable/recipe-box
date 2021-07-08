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
  }

  async remove(recipe) {
  }

  async removeAll() {
  }
}