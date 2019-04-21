import React, { Component } from 'react';
import { Query } from 'react-apollo';

import { GET_ALL_RECIPES } from '../../queries';

import './index.css';
import RecipeItem from '../RecipeItem';

class App extends Component {

  getRecipes(recipes) {
    return recipes.map(recipe => {
      return (
        <li key={recipe._id}>
          <RecipeItem recipe={recipe} />
        </li>
      )
    })
  }

  render() {
    return (
      <div className="App">
        <h1>HOME</h1>
        <Query query={GET_ALL_RECIPES}>
        {({ data, loading, error }) => {
          return (
            <div className="container flex">
            { !loading && data ? this.getRecipes(data.getAllRecipes) : 'Loading...' }
            </div>
          )
        }}
        </Query>
      </div>
    );
  }
}

export default App;
