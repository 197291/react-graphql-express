import React, { useState } from 'react';
import { ApolloConsumer } from 'react-apollo';

import Error from '../Error';
import RecipeItem from '../Recipes/RecipeItem';
import { SEARCH_RECIPES } from '../../queries/queries';

function Search() {

  const [ recipes, setListRecipes ] = useState([]);
  const [ error, setError ] = useState(null);

  function createRecipeItems() {
    return recipes.map(recipe => <RecipeItem key={recipe._id} recipe={recipe} />)
  }

  const handleChange = async (e, client) => {
    e.persist();
    try {
      const { data } = await client.query({
        query: SEARCH_RECIPES,
        variables: {
          searchTerm: e.target.value
        }
      });
      setListRecipes(data.searchRecipes || []);
    } catch(err) {
      console.error('===ERROR-SEARCH===', err);
      setError(err);
    }
  }

    return (
      <div className="container Search">
        <ApolloConsumer>
          {
            (client) => {

              return(
                <>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="u-full-width"
                    name="search"
                    id="search-input"
                    onChange={(e) => handleChange(e, client)}
                  />
                  <div>
                    {createRecipeItems()}
                  </div>
                  { error && <Error error={error} /> }
                </>
              );
            }
          }
        </ApolloConsumer>
      </div>
    );
}

export default Search;
