import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './index.scss';
import client from './queries/client';
import App from './components/App';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Navbar from './components/Navbar';
import withSession from './components/withSession';
import Search from './components/Search';
import Profile from './components/Profile';
import AddRecipe from './components/Recipes/AddRecipe';
import RecipePage from './components/Recipes/RecipePage';

import Routes from './routes';

const Root = ({ refetch, session }) => (
  <Router>
    <Navbar session={session} />
    <Switch>
      <Route path={Routes.Home} exact component={App} />
      <Route path={Routes.SignIn} render={() => <SignIn refetch={refetch} />} />
      <Route path={Routes.SignUp} render={() => <SignUp refetch={refetch} />} />
      <Route path={Routes.Search} render={() => <Search refetch={refetch} />} />
      <Route path={Routes.Profile} render={() => <Profile refetch={refetch} />} />
      <Route path={Routes.AddRecipe} render={() => <AddRecipe session={session} />} />
      <Route path={Routes.RecipePage} component={RecipePage} />
      <Redirect to={Routes.SignIn} />
    </Switch>
  </Router>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById('root')
);

