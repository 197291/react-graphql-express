import React from 'react';
import { Mutation } from 'react-apollo';

import withSession from '../../HOC/withSession';
import { LIKE_RECIPE } from '../../../queries/mutations';

class LikeRecipe extends React.Component {
  constructor(props) {
    super(props);
    let username = '';

    if (props.session.getCurrentUser) {
      username = props.session.getCurrentUser.username;
    }
    this.state = {
      username
    };
  }

  handleLike = (likeRecipe) => {
    likeRecipe().then(({ data }) => {
      console.log(data);
    });
  };

  render() {
    const { username } = this.state;
    const { _id } = this.props;
    return (
      <Mutation mutation={LIKE_RECIPE} variables={{ _id, username }}>
        {(likeRecipe) => {
          return username && <button onClick={() => this.handleLike(likeRecipe)}>Like</button>;
        }}
      </Mutation>
    );
  }
}

export default withSession(LikeRecipe);
