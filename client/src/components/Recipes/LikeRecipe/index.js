import React from 'react';
import { Mutation } from 'react-apollo';

import withSession from '../../HOC/withSession';
import { LIKE_RECIPE, UNLIKE_RECIPE } from '../../../queries/mutations';
import { GET_RECIPE } from '../../../queries';

class LikeRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.prepareState;
  }

  get prepareState() {
    let username = '';
    let liked = false;
    const { _id } = this.props;
    const { getCurrentUser } = this.props.session;
    if (getCurrentUser) {
      username = getCurrentUser.username;
      liked = getCurrentUser.favorites.findIndex((f) => f._id === _id) > -1;
    }
    return {
      username,
      liked
    };
  }

  handleClick = (likeRecipe, unlikeRecipe) => {
    this.setState(
      (prevState) => ({
        liked: !prevState.liked
      }),
      () => {
        this.handleLike(likeRecipe, unlikeRecipe);
      }
    );
  };

  handleLike = (likeRecipe, unlikeRecipe) => {
    if (this.state.liked) {
      likeRecipe().then(async ({ data }) => {
        await this.props.refetch();
      });
    } else {
      unlikeRecipe().then(async ({ data }) => {
        await this.props.refetch();
      });
    }
  };

  updateLike = (cache, { data: { likeRecipe } }) => {
    const { _id } = this.props;
    const { getRecipe } = cache.readQuery({ query: GET_RECIPE, variables: { _id } });
    cache.writeQuery({
      query: GET_RECIPE,
      variables: { _id },
      data: {
        getRecipe: { ...getRecipe, likes: likeRecipe.likes + 1 }
      }
    });
  };

  updateUnlike = (cache, { data: { unlikeRecipe } }) => {
    const { _id } = this.props;
    const { getRecipe } = cache.readQuery({ query: GET_RECIPE, variables: { _id } });

    cache.writeQuery({
      query: GET_RECIPE,
      variables: { _id },
      data: {
        getRecipe: { ...getRecipe, likes: unlikeRecipe.likes - 1 }
      }
    });
  };

  render() {
    const { username, liked } = this.state;
    const { _id, likes } = this.props;

    return (
      <Mutation
        mutation={UNLIKE_RECIPE}
        variables={{ _id, username }}
        update={this.updateUnlike}
        optimisticResponse={{
          __typename: 'Mutation',
          unlikeRecipe: {
            _id,
            __typename: 'Recipe',
            likes: likes
          }
        }}
      >
        {(unlikeRecipe) => (
          <Mutation
            mutation={LIKE_RECIPE}
            variables={{ _id, username }}
            update={this.updateLike}
            optimisticResponse={{
              __typename: 'Mutation',
              likeRecipe: {
                _id,
                __typename: 'Recipe',
                likes: likes
              }
            }}
          >
            {(likeRecipe) => {
              return (
                username && (
                  <button onClick={() => this.handleClick(likeRecipe, unlikeRecipe)}>
                    {liked ? 'Unlike' : 'Like'}
                  </button>
                )
              );
            }}
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default withSession(LikeRecipe);
