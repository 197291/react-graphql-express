import React from 'react';

import { Query } from 'react-apollo';


import { GET_USER_RECIPES } from '../../../queries';

const UserRecipes = ({ username }) => {
  return (
    <Query query={GET_USER_RECIPES} variables={username}>
    </Query>
  );
}

export default UserRecipes;
