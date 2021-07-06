import React from 'react';

import RecipeList from '../components/recipe-list';
import RecipeStore from '../RecipeStore';

/**
 * Displays a listing of all recipes. Allows the user to select a recipe to view in detail.
 */
class RecipeIndexPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.debounce((event) => this.filter(event.target.value));

    this.allRecipes = [];

    this.state = {
      recipes: []
    };
  }

  async componentDidMount() {
    const recipes = new RecipeStore();

    this.allRecipes = await recipes.all();

    this.setState({
      recipes: this.allRecipes
    });
  }

  /**
   * Filters the recipes on display to only include recipes that contain the search query (case-insensitive) within its title.
   */
  filter(query) {
    const lowerCaseQuery = query.toLowerCase();

    this.setState({
      recipes: this.allRecipes.filter(r =>
        r.title.toLowerCase().includes(lowerCaseQuery) ||
        r.tags.some(t => t.includes(lowerCaseQuery))
      )
    });
  }

  debounce(func, timeout = 250) {
    let timer;

    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), timeout)
    };
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