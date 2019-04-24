import React, { Component } from 'react';
import { Query } from 'react-apollo';

import { GET_ALL_RECIPES } from '../../queries';

import './index.scss';
import RecipeItem from '../Recipes/RecipeItem';

class App extends Component {

  getRecipes(recipes) {
    return recipes.map(recipe => {
      return (
          <RecipeItem key={recipe._id} recipe={recipe} />
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
            <div className="container flex recipe-container">
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
