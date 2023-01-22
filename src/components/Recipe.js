import React from 'react';

import './Recipe.css';
import RecipeStore from '../RecipeStore';
import TagList from '../TagList';
import MealPlanStore from '../meal-plan-store';

class Recipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      photo: '/photos/missing-photo.png',
      ingredients: [],
      directions: [],
      tags: [],
      history: []
    };

    this.handleICookedThisToday = this.handleICookedThisToday.bind(this);
    this.handleIWantToCookThis = this.handleIWantToCookThis.bind(this);
    this.toggleStepCompletion = this.toggleStepCompletion.bind(this);
  }

  async componentDidMount() {
    const recipes = new RecipeStore();
    this.recipe = await recipes.findByTitle(this.props.title);

    if (this.recipe !== undefined) {
      this.setState(this.recipe);
    }
  }

  async handleICookedThisToday() {
    const mealPlan = new MealPlanStore();
    mealPlan.remove(this.recipe);

    this.setState(
      (state) => ({
        history: [...state.history, new Date()]
      }),
      async () => {
        const recipes = new RecipeStore();
        await recipes.update(this.state);
      }
    );
  }

  async handleIWantToCookThis() {
    const store = new MealPlanStore();
    await store.add(this.state);
  }

  toggleStepCompletion(e) {
    console.log("Toggle completion of step", e.target);

    if (e.target.classList.contains('complete')) {
      e.target.classList.remove('complete');
    } else {
      e.target.classList.add('complete');
    }
  }

  render() {
    return (
      <div className="recipe">
        <section className="recipe-title">
          <h1>{this.state.title}</h1>
        </section>

        <section className="recipe-actions">
          <h2>Things you can do with this recipe...</h2>
          <ul>
            <li>
              <input type="button" value="I cooked this today" onClick={this.handleICookedThisToday} />
            </li>
            <li>
              <input type="button" value="I want to cook this" onClick={this.handleIWantToCookThis} />
            </li>
          </ul>
        </section>

        <section className="recipe-photo">
          <img src={this.state.photo || '/photos/missing-photo.png'} alt={this.state.title} />
        </section>

        <section className="recipe-tags">
          <TagList tags={this.state.tags} />
        </section>

        <section className="recipe-ingredients">
          <h3>Ingredients</h3>

          <ul>
          {
            this.state.ingredients.map((ingredient, index) => {
              return (
                <li key={index}>
                  {ingredient}
                </li>
              )
            })
          }
          </ul>
        </section>

        <section className="recipe-directions">
          <h3>Directions</h3>
          <ol>
          {
            this.state.directions.map((step, index) => {
              return (
                <li key={index} onClick={this.toggleStepCompletion}>{step}</li>
              )
            })
          }
          </ol>
        </section>
      </div>
    )
  }
}

export default Recipe;