import React from 'react';
import { Link }  from 'react-router-dom';
import Axios from 'axios';
import Recipe from '../components/recipe';

class ViewRecipePage extends React.Component {
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

    render() {
        return (
            <div>
                <Recipe recipe={this.state} />

                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-2">
                        </div>
                        <div className="col-lg-4 col-md-8">
                            <Link to={`/recipes/${this.state.name}/edit`}
                                  className="btn btn-primary btn-submit">
                                      Edit Recipe
                            </Link>
                        </div>
                        <div className="col-lg-4 col-md-2">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewRecipePage;