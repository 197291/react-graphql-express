import React from 'react';
import { NavLink } from 'react-router-dom';

import Routes from '../../../routes';

const NavbarUnAuth = () => (
  <ul >
    <li>
      <NavLink to={Routes.Home} exact>Home</NavLink>
    </li>
    <li>
      <NavLink to={Routes.Search}>Search</NavLink>
    </li>
    <li>
      <NavLink to={Routes.SignIn} exact>Sign In</NavLink>
    </li>
    <li>
      <NavLink to={Routes.SignUp} exact>Sign Up</NavLink>
    </li>
  </ul>
);

export default NavbarUnAuth;
