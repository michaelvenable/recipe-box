import React from 'react';
import { Link } from 'react-router-dom'

import RecipeStore from './RecipeStore';
import './Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.handleRefreshRecipesClick = this.handleRefreshRecipesClick.bind(this);
  }

  async handleRefreshRecipesClick() {
    const recipes = new RecipeStore();
    await recipes.syncWithServer();
  }

  render() {
    return (
      <nav className="header">
        <section className="header-left-section">
          <Link to="/recipes" className="header-app-title">Recipe Box</Link>
        </section>

        <section className="header-middle-section">
          <Link to="/recipes">Recipes</Link>
          <Link to="/plan">Meal Plan</Link>
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