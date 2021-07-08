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
  }

  async componentDidMount() {
    const wishlist = new WishlistStore();

    this.setState({
      wishlist: await wishlist.all()
    });
  }

  render() {
    return (
      <div className="wishlist">
        <h5><i className="fa fa-cutlery"></i> Wish List</h5>

        <ul>
        {
          this.state.wishlist.map(recipe =>
            <li>
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
              </article>
            </li>
          )
        }
        </ul>

      </div>
    );
  }
}