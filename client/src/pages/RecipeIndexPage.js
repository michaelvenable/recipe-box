import React from 'react';
import { Link } from 'react-router-dom'

import RecipeList from '../components/recipe-list';
import RecipeStore from '../RecipeStore';

import './RecipeIndexPage.css';

// TODO: Add a button to skip a suggestion.
// TODO: Add a button to show more suggestions.

/**
 * Displays a listing of all recipes. Allows the user to select a recipe to view in detail.
 */
class RecipeIndexPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.debounce((event) => this.filter(event.target.value));

    this.allRecipes = [];

    this.state = {
      recipes: [],      // Shown in the "All Recipes" section.
      suggestions: []   // Recipe suggestions. Currently hidden.
    };
  }

  async componentDidMount() {
    const recipes = new RecipeStore();

    this.allRecipes = await recipes.all();

    this.setState({
      recipes: this.allRecipes,
      suggestions: this.getSuggestions(this.allRecipes)
    });
  }

  /**
   * @param recipes {[]}
   * @param numSuggestions {number}
   */
  getSuggestions(recipes, numSuggestions = 3) {
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
                ? 1
                : -1;
      })
      .slice(0, Math.max(9, numSuggestions))
      .map(recipe => ({ sortKey: Math.random(), value: recipe }))
      .sort((first, second) => first.sortKey - second.sortKey)
      .map(pair => pair.value)
      .slice(0, numSuggestions);
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
      recipes: filteredRecipes,
      suggestions: this.getSuggestions(filteredRecipes, 3)
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
                ? 1
                : -1;
      })
  }

  timeSince(date) {
    const now = new Date();

    if (date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate()) {
      return 'earlier today';
    }

    const daysSince = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (daysSince < 14) {
      return `${daysSince} ${daysSince === 1 ? 'day' : 'days'} ago`;
    }

    if (daysSince < 30) {
      return `${Math.ceil(daysSince / 7)} weeks ago`;
    }

    if (daysSince < 120) {
      return `${Math.ceil(daysSince / 30)} months ago`;
    }

    return 'over 4 months ago'
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

        { /*
        <section className="list suggestions">
          <h5><i className="fa fa-cutlery"></i> Suggestions</h5>
          <div className="suggestion-list">
          {
            this.state.suggestions.map((recipe, index) =>
              <div key={index} className="suggestion">
                <Link to={`/recipes/${recipe.title}`} className="suggestion-photo">
                  <img src={recipe.photo || 'https://orbital-recipe-box-photos.s3.us-east-2.amazonaws.com/missing-photo.png'} alt="Finished Product" />
                </Link>
                <Link to={`/recipes/${recipe.title}`} className="suggestion-title">{recipe.title}</Link>
                <div className="suggestion-description">
                  { (recipe.history === undefined || recipe.history.length === 0)
                    ? <p>You've never cooked this.</p>
                    : <p>You cooked this {this.timeSince(recipe.history[recipe.history.length - 1])}.</p>
                  }
                </div>
              </div>
            )
          }
          </div>
        </section>
        */ }

        <RecipeList recipes={this.state.recipes}></RecipeList>
      </div>
    )
  }
}

export default RecipeIndexPage;