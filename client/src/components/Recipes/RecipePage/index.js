import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';

import { GET_RECIPE } from '../../../queries';

const RecipePage = ({ match }) => {
  const {_id } = match.params;

  return (
    <Query variables={{_id}} query={GET_RECIPE}>
    {
      ({ data, loading, error}) => {
      if (loading) return <div>Loading...</div>
      if (error) {
        console.error(error);
        return <div>Error...</div>
      }
      const { name, category, description, instructions, likes, username } = data.getRecipe;
      return (
        <div className="RecipePage container">
          <h2>{name}</h2>
          <p>Category: {category}</p>
          <p>Description: {description}</p>
          <p>Instructions: {instructions}</p>
          <p>Likes: {likes}</p>
          <p>Created By: {username || 'Anonymous'}</p>
          <button>Like</button>
        </div>
      );
      }
    }

    </Query>
  );
};

export default withRouter(RecipePage);
