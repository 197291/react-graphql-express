import React from 'react';

import UserInfo from '../UserInfo';

const Profile = ({ session }) => (
  <div className="container">
    <UserInfo session={session} />
  </div>
);

export default Profile;
