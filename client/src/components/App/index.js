import React, { Component } from 'react';
import { Query } from 'react-apollo';

import { GET_ALL_RECIPES } from '../../queries';

import './index.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>HOME</h1>
        <Query query={GET_ALL_RECIPES}>
        {({ data, loading, error }) => {
          return (
            <div>
            { loading ? 'Loading...' : 'Receipes' }
            </div>
          )
        }}
        </Query>
      </div>
    );
  }
}

export default App;
