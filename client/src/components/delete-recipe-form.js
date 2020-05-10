import React from 'react';
import SubmitButton from '../dom/submit-button'

/**
 * Creates an HTML form with a button to delete a recipe.
 */
export default class DeleteRecipeForm extends React.Component {
    /**
     * Initializes this with the callback.
     *
     * @param {*}       props               Settings.
     * @param {*}       props.recipe        The recipe that will be deleted.
     * @param {string}  props.onSubmit      Callback function. Invoked if the user chooses to delete the recipe.
     */
    constructor(props) {
        super(props);

        if (this.props.onSubmit === undefined) {
            throw new Error('onSubmit was not provided.');
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

    render() {
        return (
            <form style={{ marginTop: "30px" }} onSubmit={this.handleSubmit.bind(this)}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-2">
                        </div>
                        <div className="col-lg-4 col-md-8">
                            <SubmitButton label="Delete Recipe" theme="warning" />
                        </div>
                        <div className="col-lg-4 col-md-2">
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}
