import { gql } from 'apollo-boost';

export const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      _id
      name
      description
      category
      instructions
      createDate
      likes
      username
    }
  }
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
      _id
      name
      description
      category
      instructions
      createDate
      likes
      username
    }
  }
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
      _id
      name
      category
      description
      likes
      instructions
      username
      createDate
    }

  }
`;
