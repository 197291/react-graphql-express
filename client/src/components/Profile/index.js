import React from 'react';

import UserInfo from '../UserInfo';
import withAuth from '../HOC/withAuth';

const Profile = ({ session }) => (
  <div className="container">
    { session && <UserInfo session={session} /> }
  </div>
);

export default withAuth( (session) => session && session.getCurrentUser )(Profile);
