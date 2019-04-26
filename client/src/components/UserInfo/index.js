import React from 'react';

const UserInfo = ({ session: { getCurrentUser } }) => (
  <div>
    <h3> <strong>Username: </strong> {getCurrentUser.username}</h3>
  </div>
);

export default UserInfo;
