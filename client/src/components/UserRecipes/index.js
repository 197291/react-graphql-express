import React from 'react';
import { Query } from 'react-apollo';

import { GET_USER_RECIPES } from '../../queries';
import RecipeItem from '../Recipes/RecipeItem';

const UserRecipes = ({ session }) => {
  return (
    <Query
      fetchPolicy="cache-and-network"
      query={GET_USER_RECIPES}
      variables={{ username: session.getCurrentUser.username }}
    >
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error</div>;
        return (
          <>
            <h3>Your Recipes</h3>
            <div style={{ display: 'flex' }}>
              {!data.getUserRecipes.length && (
                <p>
                  <strong>You noy have added recipes yet</strong>
                </p>
              )}
              {data.getUserRecipes.map((recipe) => (
                <RecipeItem
                  username={session.getCurrentUser.username}
                  key={recipe._id}
                  recipe={recipe}
                  withLikes={true}
                />
              ))}
            </div>
          </>
        );
      }}
    </Query>
  );
};

export default UserRecipes;
