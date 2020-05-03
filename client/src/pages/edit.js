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

    handleDelete(e) {
        console.log('The user chose to delete.');
        // TODO: Write the server logic to delete a recipe.
        e.preventDefault();
    }

    render() {
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
                                {
                                    this.state.recipe === null
                                        ? <LoadingIndicator />
                                        : <EditRecipeForm recipe={this.state.recipe} onSubmit={this.handleSubmit.bind(this)} />
                                }

                                <DeleteRecipeForm onSubmit={this.handleDelete.bind(this)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
