import React, { useState } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { debounce } from 'lodash';

import Error from '../Error';
import RecipeItem from '../Recipes/RecipeItem';
import { SEARCH_RECIPES } from '../../queries/queries';

function Search() {
  const [recipes, setListRecipes] = useState([]);
  const [error, setError] = useState(null);

  function createRecipeItems() {
    return recipes.map((recipe) => (
      <RecipeItem withLikes={true} key={recipe._id} recipe={recipe} />
    ));
  }

  const searchRecipesDebounced = debounce(async (e, client) => {
    try {
      const { data } = await client.query({
        query: SEARCH_RECIPES,
        variables: {
          searchTerm: e.target.value
        }
      });
      setListRecipes(data.searchRecipes || []);
    } catch (error) {
      setError(error);
    }
  }, 300);

  const handleChange = async (e, client) => {
    e.persist();
    searchRecipesDebounced(e, client);
  };

  return (
    <div className="container Search">
      <ApolloConsumer>
        {(client) => {
          return (
            <>
              <input
                type="text"
                placeholder="Search..."
                className="u-full-width"
                name="search"
                id="search-input"
                onChange={(e) => handleChange(e, client)}
              />
              <div className="flex">{createRecipeItems()}</div>
              {error && <Error error={error} />}
            </>
          );
        }}
      </ApolloConsumer>
    </div>
  );
}

export default Search;
