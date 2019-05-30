import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { removeToken } from '../../helpers';

function handleSignout(history, client) {
  removeToken();
  client.resetStore();
  history.push('/');
}

const SignOut = ({ history }) => (
  <ApolloConsumer>
    {(client) => <button onClick={() => handleSignout(history, client)}>SIGNOUT</button>}
  </ApolloConsumer>
);

export default withRouter(SignOut);
