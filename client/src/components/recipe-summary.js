import React from 'react';
import { Link } from 'react-router-dom'

class RecipeSummary extends React.Component {
    render() {
        return (
            <div className="col-lg-4 col-sm-6">
                <div className="box grid recipes">
                    <h2><Link to={`/recipes/${this.props.recipe.name}`}>{this.props.recipe.name}</Link></h2>
                </div>
            </div>
        )
    }
}

export default RecipeSummary;