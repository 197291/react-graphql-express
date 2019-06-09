import React from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import Error from '../../Error';
import { defaultValidation } from '../../../helpers';
import { ADD_RECIPE, GET_ALL_RECIPES } from '../../../queries';
import withAuth from '../../HOC/withAuth';

class AddRecipe extends React.Component {
  constructor(props) {
    super();
    const { session } = props;

    this.state = {
      name: '',
      imageUrl: '',
      category: 'Breakfast',
      instructions: '',
      description: '',
      username: session ? session.getCurrentUser.username : 'Anonymous'
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit(e, addRecipe) {
    e.preventDefault();
    addRecipe().then(() => {
      this.props.history.push('/');
    });
  }

  get isInvalidForm() {
    return defaultValidation(this.state);
  }

  updateCache = (cache, { data: { addRecipe } }) => {
    const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });
    cache.writeQuery({
      query: GET_ALL_RECIPES,
      data: {
        getAllRecipes: [addRecipe, ...getAllRecipes]
      }
    });
  };

  render() {
    const { name, category, description, instructions, username, imageUrl } = this.state;
    return (
      <Mutation
        mutation={ADD_RECIPE}
        variables={{ name, category, description, instructions, username, imageUrl }}
        update={this.updateCache}
      >
        {(addRecipe, { data, loading, error }) => {
          return !loading ? (
            <div className="AddRecipe container">
              <h2>Add Recipe</h2>
              <form
                className="flex flex-columns center form"
                onSubmit={(e) => this.handleSubmit(e, addRecipe)}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Recipe Name"
                  onChange={this.handleChange}
                  value={name}
                />
                <input
                  type="text"
                  name="imageUrl"
                  placeholder="Recipe Image"
                  onChange={this.handleChange}
                  value={imageUrl}
                />
                <select value={category} name="category" onChange={this.handleChange}>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                </select>
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  onChange={this.handleChange}
                  value={description}
                />
                <textarea
                  type="text"
                  name="instructions"
                  placeholder="Add instructions"
                  onChange={this.handleChange}
                  value={instructions}
                />
                <button className="button-primary" disabled={loading || this.isInvalidForm}>
                  Save
                </button>
              </form>
              {error && <Error error={error} />}
            </div>
          ) : (
            <h1>Loading...</h1>
          );
        }}
      </Mutation>
    );
  }
}

export default withAuth((session) => session && session.getCurrentUser)(withRouter(AddRecipe));
