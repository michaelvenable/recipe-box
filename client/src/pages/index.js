import React from 'react';
import Axios from 'axios';

import RecipeList from '../components/recipe-list';

class RecipeIndexPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          recipes: []
        };
    }

    componentDidMount() {
        // Contact the web service.
        Axios.get("https://a2j4q04p5g.execute-api.us-east-2.amazonaws.com/prod/recipes")
        .then(response => this.setState({ recipes: response.data }))
        .catch(error => console.error(error));
    }

    render() {
        return (
            <div>
                <RecipeList recipes={this.state.recipes}></RecipeList>
            </div>
        )
    }
}

export default RecipeIndexPage;