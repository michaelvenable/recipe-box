import React from 'react';
import Axios from 'axios';

export default class EditRecipePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            ingredients: [],
            steps: []
        };
    }

    componentDidMount() {
        Axios.get(`https://a2j4q04p5g.execute-api.us-east-2.amazonaws.com/prod/recipes/${this.props.match.params.name}`)
        .then(response => this.setState(response.data))
        .catch(error => console.error(error));
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

    handleSubmit(e) {
        Axios.put(
            `https://a2j4q04p5g.execute-api.us-east-2.amazonaws.com/prod/recipes/${this.state.name}`,
            this.state
        )
        .then(response => this.props.history.push('/recipes'))
        .catch(error => console.error(error));

        e.preventDefault();
    }

    render() {
        return (
            <div className="submit">
                <div className="title">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h2>Edit {this.state.name}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
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
