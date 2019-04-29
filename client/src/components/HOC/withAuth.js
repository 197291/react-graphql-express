import React from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import { GET_CURRENT_USER } from '../../queries';



const withAuth = conditionFunc => Component => props => (

  <Query query={GET_CURRENT_USER}>
  {
    ({ data, loading }) => {
      if (loading) return null;
      console.log('===current user===', data);
      return conditionFunc(data)
        ? <Component { ...props} session={data}/>
        : <Redirect to="/" />
    }
  }
  </Query>
);

export default withAuth;