import React from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import { DELETE_USER_RECIPE } from '../../../queries';

import './index.scss';

const handleDelete = deleteUserReipe => {
  const confirmation = window.confirm('Are you sure you want delete recipe?');

  if (confirmation) {
    deleteUserReipe();
  }
}

const RecipeItem = ({ recipe, withLikes }) => (
  <div className="RecipeItem">
  <Link to={`/recipes/${recipe._id}`}>
    <h4>
      {recipe.name}
    </h4>
  </Link>
    <p>
      <strong>
        {recipe.category}
      </strong>
    </p>
    { withLikes && <p>Likes: {recipe.likes}</p>}
    <Mutation
      mutation={DELETE_USER_RECIPE}
      variables={{ _id: recipe._id}}
      update={ (cache, { data: { deleteUserRecipe } }) => {
        console.log(cache);
        const { getUserRecipes } = cache.readQuery({
          query: GET_USER_RECIPES,
          variables: { username }
        })

        cache.writeQuery({
          query: GET_USER_RECIPES,
          variables: { username },
          data: {
            getUserRecipes: getUserRecipes.filter(recipe => recipe._id !== deleteUserRecipe._id)
          }
        })
      }}
    >
      {
        (deleteUserReipe, attr = {}) => (
          <button
            className="delete-button"
            onClick={() => handleDelete(deleteUserReipe)}
          >
            { attr.loading ? 'Deleting...' : 'X' }
          </button>
        )
      }

    </Mutation>
  </div>
);

export default RecipeItem;
