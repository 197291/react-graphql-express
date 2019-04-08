import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './index.css';
import client from './queries/client';
import App from './components/App';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';

const Root = () => (
  <Router>
    <Switch>
      <Route path='/' exact component={App} />
      <Route path='/signin' component={SignIn} />
      <Route path='/signup' component={SignUp} />
      <Redirect to="" />
    </Switch>
  </Router>
);

ReactDOM.render(
  <ApolloProvider client={client}>
    <Root />
  </ApolloProvider>,
  document.getElementById('root')
);

