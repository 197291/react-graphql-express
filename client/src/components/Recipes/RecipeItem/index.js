import React from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import { DELETE_USER_RECIPE, GET_USER_RECIPES } from '../../../queries';

import './index.scss';

const handleDelete = (deleteUserReipe) => {
  const confirmation = window.confirm('Are you sure you want delete recipe?');

  if (confirmation) {
    deleteUserReipe();
  }
};

const RecipeItem = ({ recipe, withLikes, username }) => (
  <article style={{ boxShadow: '1px 1px 15px 5px rgba(143,143,143,1)' }} className="RecipeItem">
    <div
      style={{
        position: 'relative',
        background: `url(${recipe.imageUrl}) center center no-repeat`,
        backgroundSize: 'cover',
        minHeight: '150px'
      }}
    >
      <p
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          background: '#00c9b7',
          borderRadius: '4px',
          padding: '4px 6px',
          marginBottom: 0
        }}
      >
        <strong style={{ color: '#ffffff' }}>{recipe.category}</strong>
      </p>
      {withLikes && <p className="likes">Likes: {recipe.likes}</p>}
      {username && (
        <Mutation
          mutation={DELETE_USER_RECIPE}
          variables={{ _id: recipe._id }}
          update={(cache, { data: { deleteUserRecipe } }) => {
            const { getUserRecipes } = cache.readQuery({
              query: GET_USER_RECIPES,
              variables: { username }
            });

            cache.writeQuery({
              query: GET_USER_RECIPES,
              variables: { username },
              data: {
                getUserRecipes: getUserRecipes.filter(
                  (recipe) => recipe._id !== deleteUserRecipe._id
                )
              }
            });
          }}
        >
          {(deleteUserReipe, attr = {}) => (
            <button className="delete-button" onClick={() => handleDelete(deleteUserReipe)}>
              {attr.loading ? 'Deleting...' : 'X'}
            </button>
          )}
        </Mutation>
      )}
    </div>

    <Link to={`/recipes/${recipe._id}`}>
      <h4>{recipe.name}</h4>
    </Link>
  </article>
);

export default RecipeItem;
