import React from 'react';

import RecipeList from '../components/recipe-list';
import RecipeStore from '../RecipeStore';

// TODO: Let the user search for a recipe by name.

/**
 * Displays a listing of all recipes. Allows the user to select a recipe to view in detail.
 */
class RecipeIndexPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: []
    };
  }

  async componentDidMount() {
    const recipes = new RecipeStore();

    this.setState({
      recipes: await recipes.all()
    });
  }

  render() {
    return (
      <div>
        <RecipeList recipes={this.state.recipes}></RecipeList>
      </div>
    )
  }
}

export default RecipeIndexPage;