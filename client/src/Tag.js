import React from 'react';

import './Tag.css';

export default class RecipeTag extends React.Component {
  render() {
    return (
      <span className="tag">{this.props.label}</span>
    );
  }
}
