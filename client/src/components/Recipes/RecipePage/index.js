import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';

import { GET_RECIPE } from '../../../queries';

const RecipePage = ({ match }) => {
  const { _id } = match.params;

  return (
    <Query variables={{ _id }} query={GET_RECIPE}>
      {({ data, loading, error }) => {
        if (loading) return <div className="container">Loading...</div>;
        if (error) {
          console.error(error);
          return <div>Error...</div>;
        }
        const { name, category, description, instructions, likes, username } = data.getRecipe;
        return (
          <div className="RecipePage container">
            <h2>{name}</h2>
            <p>
              <strong>Category:</strong> {category}
            </p>
            <p>
              <strong>Description:</strong> {description}
            </p>
            <p>
              <strong>Instructions:</strong> {instructions}
            </p>
            <p>
              <strong>Likes:</strong> {likes}
            </p>
            <p>
              <strong>Created By:</strong> {username || 'Anonymous'}
            </p>
            <button>Like</button>
          </div>
        );
      }}
    </Query>
  );
};

export default withRouter(RecipePage);
