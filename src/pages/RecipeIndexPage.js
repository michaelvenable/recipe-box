import React from 'react';

import RecipeList from '../components/RecipeList';
import RecipeStore from '../RecipeStore';

import './RecipeIndexPage.css';

// TODO: Add a button to skip a suggestion.

/**
 * Displays a listing of all recipes. Allows the user to select a recipe to view in detail.
 */
class RecipeIndexPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.debounce((event) => this.filter(event.target.value));

    this.allRecipes = [];

    this.state = {
      recipes: []      // Shown in the "All Recipes" section.
    };
  }

  async componentDidMount() {
    const recipes = new RecipeStore();

    this.allRecipes = await recipes.all();

    this.setState({
      recipes: this.sort(this.allRecipes)
    });
  }

  /**
   * Filters the recipes on display to only include recipes that contain the search query (case-insensitive) within its title.
   */
  filter(query) {
    const lowerCaseQuery = query.toLowerCase();

    const filteredRecipes =
      this.allRecipes.filter(r =>
        r.title.toLowerCase().includes(lowerCaseQuery) ||
        (r.tags || []).some(t => t.includes(lowerCaseQuery))
      );

    this.setState({
      recipes: filteredRecipes
    });
  }

  debounce(func, timeout = 250) {
    let timer;

    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), timeout)
    };
  }

  /**
   * Orders the recipe by last time cooked.
   *
   * @param {[]} Recipes that will be sorted.
   *
   * @returns {[]} Sorted array of recipes.
   */
  sort(recipes) {
    console.log("Sorting recipe.");

    return recipes
      .sort((first, second) => {
        if ((first.history === undefined || first.history.length === 0) &&
            (second.history === undefined || second.history.length === 0)) {
          return 0;
        }

        if (first.history === undefined || first.history.length === 0) {
          return -1;
        }

        if (second.history === undefined || second.history.length === 0) {
          return 1;
        }

        return first.history[first.history.length - 1] < second.history[second.history.length - 1]
                ? -1
                : 1;
      })
  }

  render() {
    // TODO: Remove bootstrap. Replace with grid or flex.
    return (
      <div>
        <div className="search">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <input type="search" className="form-control" placeholder="Find a recipe..." onKeyUp={this.handleSearch} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <RecipeList recipes={this.state.recipes}></RecipeList>
      </div>
    )
  }
}

export default RecipeIndexPage;