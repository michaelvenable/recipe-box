/**
 * Provides local storage of all data for the Recipe Box app. Objects of all data types are placed in this one database.
 * Classes, like the RecipeStore, provide storage of specific data types.
 */
class RecipeBoxDatabase {
  /**
   * Initializes this with a database name. The name determines where the data is stored. Thus, by using a different name,
   * you are essentially created a new database.
   */
  constructor(name = 'recipe-box') {
    this.name = name;
  }

  open() {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(this.name, this.version);

      request.onerror = (event) => {
        console.log('Database error:', event.target.error);
        reject(event.target.error);
      };

      request.onsuccess = (event) => {
        console.log('Database created.');
        this.database = event.target.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        console.log(`Upgrading database to version ${this.version}.`);
        const db = event.target.result;

        db.createObjectStore(
          'recipes',
          {
            keyPath: 'title'
          }
        );
      };
    });
  }

  get isOpen() {
    return this.database !== undefined;
  }

  transaction(...args) {
    return this.database.transaction(...args);
  }

  get version() {
      return 1;
  }
}

export default RecipeBoxDatabase;