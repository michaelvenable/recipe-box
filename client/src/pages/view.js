import React from 'react';
import Axios from 'axios';
import Recipe from '../components/recipe';

class ViewRecipePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            ingredients: [],
            directions: []
        };
    }

    async componentDidMount() {
        // TODO: Load from a RecipeStore service.
        const recipes = (await Axios.get('../data.json')).data;
        const recipe = recipes.find(r => r.title === this.props.match.params.title);
        this.setState(recipe);
    }

    render() {
        return (
            <div>
                <Recipe recipe={this.state} />
            </div>
        )
    }
}

export default ViewRecipePage;