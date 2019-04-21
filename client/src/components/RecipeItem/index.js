import React from 'react';

const RecipeItem = ({ recipe }) => (
  <div>
    <h4>
      {recipe.name}
    </h4>
    <p>
      <strong>
        {recipe.category}
      </strong>
    </p>
  </div>
);

export default RecipeItem;
