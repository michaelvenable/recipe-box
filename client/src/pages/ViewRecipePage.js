import React from 'react';

import Recipe from '../components/recipe';
import RecipeStore from '../RecipeStore';

class ViewRecipePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      ingredients: [],
      directions: []
    };
  }

  async componentDidMount() {
    const recipes = new RecipeStore();
    const currentRecipe = await recipes.findByTitle(this.props.match.params.title);

    if (currentRecipe !== undefined) {
      this.setState(currentRecipe);
    }
  }

  render() {
    return (
      <div>
        <Recipe recipe={this.state} />
      </div>
    )
  }
}

export default ViewRecipePage;