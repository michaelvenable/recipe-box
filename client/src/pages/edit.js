import React from 'react';
import Axios from 'axios';

import DeleteRecipeForm from '../components/delete-recipe-form';
import EditRecipeForm from '../components/edit-recipe-form';
import LoadingIndicator from '../dom/loading-indicator';

export default class EditRecipePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recipe: null
        };
    }

    componentDidMount() {
        Axios.get(`https://a2j4q04p5g.execute-api.us-east-2.amazonaws.com/prod/recipes/${this.props.match.params.name}`)
        .then(response => this.setState({ recipe: response.data }))
        .catch(error => console.error(error));
    }

    handleSubmit(recipe) {
        console.log("Submitted.");
        Axios.put(
            `https://a2j4q04p5g.execute-api.us-east-2.amazonaws.com/prod/recipes/${recipe.name}`,
            recipe
        )
        .then(response => this.props.history.push('/recipes'))
        .catch(error => console.error(error));
    }

    handleDelete(recipe) {
        console.log('Deleting a recipe.', recipe);

        Axios.delete(
            `https://a2j4q04p5g.execute-api.us-east-2.amazonaws.com/prod/recipes/${recipe.name}`
        )
        .then(response => this.props.history.push('/recipes'))
        .catch(error => console.error(error));
    }

    render() {
        var buttons;

        if (this.state.recipe === null) {
            buttons = <LoadingIndicator />;
        } else {
            buttons = 
                <div>
                    <EditRecipeForm recipe={this.state.recipe} onSubmit={this.handleSubmit.bind(this)} />
                    <DeleteRecipeForm recipe={this.state.recipe} onSubmit={this.handleDelete.bind(this)} />
                </div>;
        }
        return (
            <div className="submit">
                <div className="title">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                {
                                    this.state.recipe == null
                                        ? <LoadingIndicator />
                                        : <h2>Edit {this.state.recipe.name}</h2>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                {buttons}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
