import React from 'react';
import { Link } from 'react-router-dom'

import TagList from '../TagList';

class RecipeSummary extends React.Component {
  timeSince(date) {
    const now = new Date();

    if (date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate()) {
      return 'earlier today';
    }

    const daysSince = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (daysSince <= 0) {
      return 'yesterday';
    }

    if (daysSince < 14) {
      return `${daysSince} ${daysSince === 1 ? 'day' : 'days'} ago`;
    }

    if (daysSince < 30) {
      return `${Math.ceil(daysSince / 7)} weeks ago`;
    }

    if (daysSince < 120) {
      return `${Math.ceil(daysSince / 30)} months ago`;
    }

    return 'over 4 months ago';
  }

  render() {
    return (
      <div className="col-lg-4 col-sm-6">
        <div className="box grid recipes">
          <Link to={`/recipes/${this.props.recipe.title}`}>
            <img className="recipe-photo" src={this.props.recipe.photo || '/photos/missing-photo.png'}
                 alt="{this.props.recipe.title}." />
          </Link>

          <h2><Link to={`/recipes/${this.props.recipe.title}`}>{this.props.recipe.title}</Link></h2>
          { (this.props.recipe.history === undefined || this.props.recipe.history.length === 0)
            ? <p>You've never cooked this.</p>
            : <p>You cooked this {this.timeSince(this.props.recipe.history[this.props.recipe.history.length - 1])}.</p>
          }

          <section className="recipe-tags">
            <TagList tags={this.props.recipe.tags || []} />
          </section>
        </div>
      </div>
    )
  }
}

export default RecipeSummary;