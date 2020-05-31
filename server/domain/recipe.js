class Recipe {
    constructor(name, ingredients = [], steps = []) {
        this.name = name;
        this.ingredients = ingredients;
        this.steps = steps;
    }
}

module.exports = Recipe;