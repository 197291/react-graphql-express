import React from 'react';

import { Link } from 'react-router-dom';
import { defaultLocalDate, defaultLocalTime } from '../../helpers';

import './index.scss';

const formatDate = (d) => {
  const date = defaultLocalDate(d);
  const time = defaultLocalTime(d);
  return `${date} at ${time}`;
};

const UserInfo = ({ session: { getCurrentUser } }) => (
  <div className="UserInfo">
    <h3>User Info</h3>
    <p>
      <strong>Username: </strong> {getCurrentUser.username}
    </p>
    <p>
      <strong>Email: </strong> {getCurrentUser.email}
    </p>
    <p>
      <strong>Join Date: </strong> {formatDate(getCurrentUser.joinDate)}
    </p>
    <h4>{getCurrentUser.username}'s Favorites</h4>
    <ul>
      {getCurrentUser.favorites.map((recipe) => {
        return (
          <li key={recipe._id}>
            <Link to={`/resipes/${recipe._id}`}>
              <p>
                <strong>Name: </strong>
                {recipe.name}
              </p>
            </Link>
          </li>
        );
      })}
      {!getCurrentUser.favorites.length && (
        <p>
          <strong>You don't have favorites. Go and add!</strong>
        </p>
      )}
    </ul>
  </div>
);

export default UserInfo;
