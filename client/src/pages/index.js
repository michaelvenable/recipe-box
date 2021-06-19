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

    async componentDidMount() {
        // TODO: Load from a RecipeStore service.
        const recipes = (await Axios.get('data.json')).data;

        this.setState({
            recipes: recipes
        });
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