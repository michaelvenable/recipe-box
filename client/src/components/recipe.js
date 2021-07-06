import React from 'react';

import './Recipe.css';

/**
 * Displays the recipe for the cook while cooking.
 */
class Recipe extends React.Component {
  toggleStepCompletion(e) {
    console.log("Toggle completion of step", e.target);

    if (e.target.classList.contains('complete')) {
      e.target.classList.remove('complete');
    } else {
      e.target.classList.add('complete');
    }
  }

  render() {
    return (
      <div className="recipe-detail">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 text-center">
              <h1>{this.props.recipe.title}</h1>
            </div>

            <div className="col-lg-8">
              <img class="recipe-photo" src={this.props.recipe.photo} alt={this.props.recipe.title} />

              <ul className="tags">
              {
                this.props.recipe.tags.map(tag =>
                  <li className="tag">{tag}</li>
                )
              }
              </ul>

              <div className="ingredient-direction">
                <div className="row">
                  <div className="col-lg-6 col-sm-6">
                    <h3>Ingredients</h3>

                    <ul className="ingredients">
                    {
                      this.props.recipe.ingredients.map((ingredient, index) => {
                        return (
                          <li key={index}>
                            {ingredient}
                          </li>
                        )
                      })
                    }
                    </ul>
                  </div>

                  <div className="col-lg-6 col-sm-6">
                    <h3>Directions</h3>
                    <ol className="directions">
                    {
                      this.props.recipe.directions.map((step, index) => {
                        return (
                          <li key={index} onClick={this.toggleStepCompletion}>{step}</li>
                        )
                      })
                    }
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Recipe;