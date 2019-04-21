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
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      joinDate
      email
      username
    }
  }
`;
