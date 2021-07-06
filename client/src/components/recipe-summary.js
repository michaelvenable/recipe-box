import React from 'react';
import { Link } from 'react-router-dom'

import TagList from '../TagList';

class RecipeSummary extends React.Component {
  render() {
    return (
      <div className="col-lg-4 col-sm-6">
        <div className="box grid recipes">
          <Link to={`/recipes/${this.props.recipe.title}`}>
            <img src={this.props.recipe.photo || 'https://orbital-recipe-box-photos.s3.us-east-2.amazonaws.com/missing-photo.png'} 
                 alt="{this.props.recipe.title}." />
          </Link>

          <h2><Link to={`/recipes/${this.props.recipe.title}`}>{this.props.recipe.title}</Link></h2>

          <section class="recipe-tags">
            <TagList tags={this.props.recipe.tags || []} />
          </section>
        </div>
      </div>
    )
  }
}

export default RecipeSummary;