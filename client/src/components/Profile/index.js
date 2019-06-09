import React from 'react';

import UserInfo from '../UserInfo';
import UserRecipes from '../UserRecipes';
import withAuth from '../HOC/withAuth';

const Profile = ({ session }) => (
  <div className="container recipe-container">
    {session && <UserInfo session={session} />}
    {session && <UserRecipes session={session} />}
  </div>
);

export default withAuth((session) => session && session.getCurrentUser)(Profile);
