import React from 'react';
import Axios from 'axios';
import TextField from '../dom/text-field'

export default class NewRecipePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            ingredients: [],
            steps: []
        };
    }

    add(e) {
        Axios.post("https://a2j4q04p5g.execute-api.us-east-2.amazonaws.com/prod/recipes", this.state)
        .then(response => this.props.history.push('/recipes'))
        .catch(error => console.error(error));

        e.preventDefault();
    }

    handleNameChange(e) {
        this.setState({
            name: e.target.value
        });
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

    handleImageChange(e) {
        this.setState({
            imageUrl: e.target.value
        });
    }

    render() {
        return (
            <div className="submit">
                <div className="title">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h2>Enter a New Recipe</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <form onSubmit={this.add.bind(this)}>

                                    <div className="form-group">
                                        <label htmlFor="name">Recipe Title</label>
                                        <input id="name"
                                               type="text"
                                               value={this.state.name}
                                               className="form-control"
                                               onChange={this.handleNameChange.bind(this)} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="ingredients">Ingredients:</label>
                                        <textarea id="ingredients"
                                                  className="form-control"
                                                  value={this.state.ingredients.join('\n')}
                                                  onChange={this.handleIngredientsChange.bind(this)}
                                                  rows="8"
                                                  required="required"></textarea>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="directions">Directions:</label>
                                        <textarea id="directions"
                                                  value={this.state.steps.join('\n')}
                                                  onChange={this.handleStepsChange.bind(this)}
                                                  className="form-control"
                                                  rows="15"
                                                  required="required"></textarea>
                                    </div>

                                    <TextField
                                        id="image"
                                        label="Image URL"
                                        onChange={this.handleImageChange.bind(this)}
                                        value={this.state.imageUrl} />

                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-4 col-md-2">
                                            </div>
                                            <div className="col-lg-4 col-md-8">
                                                <button type="submit" className="btn btn-primary btn-submit">Submit Recipe</button>
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
