import React from 'react';
import SubmitButton from '../dom/submit-button'
import TextAreaField from '../dom/text-area-field'

export default class EditRecipeForm extends React.Component {
    constructor(props) {
        super(props);

        if (props.onSubmit === undefined) {
            throw new Error("onSubmit is required.");
        }

        this.state = {
            name: props.recipe.name,
            ingredients: props.recipe.ingredients,
            steps: props.recipe.steps,
            onSubmit: props.onSubmit
        };
    }

    handleSubmit(e) {
        this.state.onSubmit({
            name: this.state.name,
            ingredients: this.state.ingredients,
            steps: this.state.steps
        });

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
                <TextAreaField
                    id="ingredients"
                    label="Ingredients"
                    onChange={this.handleIngredientsChange.bind(this)}
                    required="required"
                    rows="4"
                    value={this.state.ingredients.join('\n')} />

                <TextAreaField
                    id="directions"
                    label="Directions"
                    onChange={this.handleStepsChange.bind(this)}
                    required="required"
                    rows="4"
                    value={this.state.steps.join('\n')} />

                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-2">
                        </div>
                        <div className="col-lg-4 col-md-8">
                            <SubmitButton label="Save Changes" />
                        </div>
                        <div className="col-lg-4 col-md-2">
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}