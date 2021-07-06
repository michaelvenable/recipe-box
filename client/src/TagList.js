import React from "react";

import Tag from './Tag';

import './TagList.css';

export default class TagList extends React.Component {
  render() {
    return (
      <ul class="tags">
      {
        this.props.tags.sort().map(tag =>
          <li><Tag label={tag} /></li>
        )
      }
      </ul>
    );
  }
}