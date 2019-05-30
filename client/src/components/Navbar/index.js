import React from 'react';

import NavbarUnAuth from './NavbarUnAuth';
import NavbarAuth from './NavbarAuth';

const Navbar = ({ session }) => (
  <header>
    <nav>
      {session && session.getCurrentUser ? <NavbarAuth session={session} /> : <NavbarUnAuth />}
    </nav>
  </header>
);

export default Navbar;
