import React from 'react';
import { Link } from 'react-router-dom'

import RecipeStore from './RecipeStore';

class Menu extends React.Component {
  constructor() {
    super();
    this.handleRefreshRecipesClick = this.handleRefreshRecipesClick.bind(this);
  }

  async handleRefreshRecipesClick() {
    const recipes = new RecipeStore();
    await recipes.removeAll();

    location.href = '/';
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container-fluid justify-content-center">
          <Link to="/recipes" className="navbar-brand"><span>Recipe Box</span></Link>
          <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
            <ul className="navbar-nav">
            { /* If this nav item is removed, the menu collapses :( */ }
              <li className="nav-item">
                <Link to="/recipes" className="nav-link">&nbsp;</Link>
              </li>
              <li className="nav-item btn-submit-recipe">
                <a className="nav-link" href="#" onClick={this.handleRefreshRecipesClick}>
                  <i className="fa fa-rotate-right" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Menu;