import React from 'react';
import Axios from 'axios';

export default class EditRecipeForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.recipe.name,
            ingredients: props.recipe.ingredients,
            steps: props.recipe.steps
        };
    }

    handleSubmit(e) {
        // Send this back to the parent component.
        console.log("Done edit. Recipe is", this.state);

        e.preventDefault();
    }

    handleIngredientsChange(e) {
        this.setState({
            ingredients: e.target.value.split('\n')
        });
    }

    handleStepsChange(e) {
        this.setState({
            steps: e.target.value.split('\n')
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                    <label htmlFor="ingredients">Ingredients:</label>
                    <textarea id="ingredients"
                                className="form-control"
                                value={this.state.ingredients.join('\n')}
                                onChange={this.handleIngredientsChange.bind(this)}
                                rows="4"
                                required="required"></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="directions">Directions:</label>
                    <textarea id="directions"
                                value={this.state.steps.join('\n')}
                                onChange={this.handleStepsChange.bind(this)}
                                className="form-control"
                                rows="4"
                                required="required"></textarea>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-2">
                        </div>
                        <div className="col-lg-4 col-md-8">
                            <button type="submit" className="btn btn-primary btn-submit">Save Changes</button>
                        </div>
                        <div className="col-lg-4 col-md-2">
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}