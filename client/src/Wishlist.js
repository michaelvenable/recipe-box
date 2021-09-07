import React from "react";
import { Link } from 'react-router-dom'

import TagList from './TagList';
import WishlistStore from './WishlistStore';

import './Wishlist.css';

// TODO: Allow the user to remove an item from the wishlist.
// TODO: Remove an item from the wish list when the user cooks it.

export default class Wishlist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wishlist: []
    };

    this.handleRemoveRecipe = this.handleRemoveRecipe.bind(this);
  }

  async componentDidMount() {
    const wishlist = new WishlistStore();

    this.setState({
      wishlist: await wishlist.all()
    });
  }

  /**
   * Removes a recipe from the user's wish list.
   */
  async handleRemoveRecipe(recipe) {
    const wishlist = new WishlistStore();

    // Remove from Local Storage.
    await wishlist.remove(recipe);

    // Remove from on-screen list.
    this.setState(prevState => ({
      wishlist: prevState.wishlist.filter(r => r !== recipe)
    }));
  }

  render() {
    return (
      <div className="wishlist">
        <h5><i className="fa fa-cutlery"></i> Wish List</h5>

        <ul>
        {
          this.state.wishlist.map(recipe =>
            <li key={recipe.title}>
              <article className="wishlist-item">
                <Link className="wishlist-item-photo" to={`/recipes/${recipe.title}`}>
                  <img src={recipe.photo || 'https://orbital-recipe-box-photos.s3.us-east-2.amazonaws.com/missing-photo.png'}
                       alt="{recipe.title}." />
                </Link>

                <Link className="wishlist-item-title" to={`/recipes/${recipe.title}`}>
                  {recipe.title}
                </Link>

                <div className="wishlist-item-tags">
                  <TagList tags={recipe.tags || []} />
                </div>

                <div className="wishlist-item-actions">
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