import { gql } from 'apollo-boost';

import { recipeFragments } from './fragments';

export const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      ...CompleteRecipe
    }
  }
  ${recipeFragments.recipe}
`;

export const SEARCH_RECIPES = gql`
  query($searchTerm: String) {
    searchRecipes(searchTerm: $searchTerm) {
      _id
      name
      category
      createDate
      likes
      username
    }
  }
`;

export const GET_RECIPE = gql`
  query($_id: ID!) {
    getRecipe(_id: $_id) {
      ...CompleteRecipe
    }
  }
  ${recipeFragments.recipe}
`;
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      joinDate
      email
      username
      favorites {
        _id
        name
      }
    }
  }
`;
export const GET_USER_RECIPES = gql`
  query($username: String!) {
    getUserRecipes(username: $username) {
      ...CompleteRecipe
    }
  }
  ${recipeFragments.recipe}
`;
