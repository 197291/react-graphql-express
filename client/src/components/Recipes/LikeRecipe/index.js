import React from 'react';
import withSession from '../../HOC/withSession';

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
  render() {
    const { username } = this.state;
    return username && <button>Like</button>;
  }
}

export default withSession(LikeRecipe);
