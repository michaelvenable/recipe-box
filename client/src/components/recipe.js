import React from 'react';

class Recipe extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="recipe-detail">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12 text-center">
                            <h1>{this.props.recipe.name}</h1>
                        </div>

                        <div className="col-lg-8">
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
                                            this.props.recipe.steps.map((step, index) => {
                                                return (
                                                    <li key={index}>{step}</li>
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