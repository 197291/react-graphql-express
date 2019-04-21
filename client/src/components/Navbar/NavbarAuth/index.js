import React from 'react';
import { NavLink } from 'react-router-dom';

import Routes from '../../../routes';

const NavbarAuth = ({ session }) => (
  <>
    <ul >
      <li>
        <NavLink to={Routes.Home} exact>Home</NavLink>
      </li>
      <li>
        <NavLink to={Routes.Search}>Search</NavLink>
      </li>
      <li>
        <NavLink to={Routes.AddRecipe}>Add Recipe</NavLink>
      </li>
      <li>
        <NavLink to={Routes.Profile}>Profile</NavLink>
      </li>
      <li>
        <button>SIGNOUT</button>
      </li>
    </ul>
    <h4>Welcome, <strong>{session.getCurrentUser.username}</strong></h4>
  </>
);

export default NavbarAuth;
