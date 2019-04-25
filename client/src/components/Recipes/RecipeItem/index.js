import React from 'react';
import { Link } from 'react-router-dom';

import './index.scss';

const RecipeItem = ({ recipe, withLikes }) => (
  <div className="RecipeItem">
  <Link to={`/recipes/${recipe._id}`}>
    <h4>
      {recipe.name}
    </h4>
  </Link>
    <p>
      <strong>
        {recipe.category}
      </strong>
    </p>
    { withLikes && <p>Likes: {recipe.likes}</p>}
  </div>
);

export default RecipeItem;
