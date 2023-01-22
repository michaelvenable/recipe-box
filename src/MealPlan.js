import React from "react";
import { Link } from 'react-router-dom'

import TagList from './TagList';
import MealPlanStore from './meal-plan-store';

import './MealPlan.css';

// TODO: Allow the user to remove an item from the plan.
// TODO: Remove an item from the plan when the user cooks it.

export default class MealPlan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      plan: []
    };

    this.handleRemoveRecipe = this.handleRemoveRecipe.bind(this);
  }

  async componentDidMount() {
    const plan = new MealPlanStore();

    this.setState({
      plan: await plan.all()
    });
  }

  /**
   * Removes a recipe from the user's meal plan.
   */
  async handleRemoveRecipe(recipe) {
    const plan = new MealPlanStore();

    // Remove from Local Storage.
    await plan.remove(recipe);

    // Remove from on-screen list.
    this.setState(prevState => ({
      plan: prevState.plan.filter(r => r !== recipe)
    }));
  }

  render() {
    return (
      <div className="meal-plan">
        <h5><i className="fa fa-cutlery"></i> Meal Plan</h5>

        <ul>
        {
          this.state.plan.map(recipe =>
            <li key={recipe.title}>
              <article className="meal-plan-item">
                <Link className="meal-plan-item-photo" to={`/recipes/${recipe.title}`}>
                  <img src={recipe.photo || '/photos/missing-photo.png'}
                       alt="{recipe.title}." />
                </Link>

                <Link className="meal-plan-item-title" to={`/recipes/${recipe.title}`}>
                  {recipe.title}
                </Link>

                <div className="meal-plan-item-tags">
                  <TagList tags={recipe.tags || []} />
                </div>

                <div className="meal-plan-item-actions">
                  <input type="button" value="Remove" onClick={() => this.handleRemoveRecipe(recipe)}/>
                </div>
              </article>
            </li>
          )
        }
        </ul>

      </div>
    );
  }
}