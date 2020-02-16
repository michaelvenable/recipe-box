import React from 'react';
import RecipeSummary from './recipe-summary';

class RecipeList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="list">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h5><i className="fa fa-cutlery" aria-hidden="true"></i> All Recipes</h5>
                        </div>
                        {
                            this.props.recipes.map((recipe, index) => {
                                return (
                                    <RecipeSummary key={index} recipe={recipe} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default RecipeList;
