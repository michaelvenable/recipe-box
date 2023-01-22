import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';
import RecipeStore from './RecipeStore';

class Header extends React.Component {
  constructor() {
    super();
    this.handleRefreshRecipesClick = this.handleRefreshRecipesClick.bind(this);
  }

  handleRefreshRecipesClick() {
    const recipes = new RecipeStore();
    recipes.syncWithServer();
  }

  render() {
    return (
      <nav className="header">
        <section className="header-left-section">
          <Link to="/recipes" className="header-app-title">Recipe Box</Link>
        </section>

        <section className="header-middle-section">
          <Link to="/recipes">My Recipes</Link>
          <Link to="/plan">My Meal Plan</Link>
        </section>

        <section className="header-right-section">
          <Link className="header-icon" to="/" onClick={this.handleRefreshRecipesClick} title="Download latest recipes">
            <i className="fa fa-rotate-right"></i>
          </Link>
        </section>
      </nav>
    )
  }
}

export default Header;