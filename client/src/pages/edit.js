import React from 'react';
import Axios from 'axios';

import EditRecipeForm from '../components/edit-recipe-form';

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
    handleSubmit(e) {
        // Axios.put(
        //     `https://a2j4q04p5g.execute-api.us-east-2.amazonaws.com/prod/recipes/${this.state.name}`,
        //     this.state
        // )
        // .then(response => this.props.history.push('/recipes'))
        // .catch(error => console.error(error));

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
                                        ? <p>Loading</p>
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
                                        ? <p>Loading</p>
                                        : <EditRecipeForm recipe={this.state.recipe} />
                                }

                                <form style={{ marginTop: "30px" }}>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-4 col-md-2">
                                            </div>
                                            <div className="col-lg-4 col-md-8">
                                                <button type="submit" className="btn btn-warning btn-submit">Delete Recipe</button>
                                            </div>
                                            <div className="col-lg-4 col-md-2">
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
