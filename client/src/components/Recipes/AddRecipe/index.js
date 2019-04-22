import React from 'react';
import { Mutation } from 'react-apollo';

import Error from '../../Error';
import { defaultValidation } from '../../../helpers';
import { ADD_RECIPE } from '../../../queries';

class AddRecipe extends React.Component {

  constructor(props) {
    super();
    const { session } = props;

    this.state = {
      name: '',
      category: 'Breakfast',
      instructions: '',
      description: '',
      username: session ? session.getCurrentUser.username : 'Anonymous'
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  setDefaultState = () => {
    const { session } = this.props;
    this.setState({
      name: '',
      category: 'Breakfast',
      instructions: '',
      description: '',
      username: session ? session.getCurrentUser.username : 'Anonymous'
    })
  }

  handleSubmit(e, addRecipe) {
    e.preventDefault();
    addRecipe().then((data) => {
      this.setDefaultState();
    })
  }

  get isInvalidForm() {
    return defaultValidation(this.state)
  }

  render() {
    const { name, category, description, instructions, username } = this.state;
    return (
      <Mutation
        mutation={ADD_RECIPE}
        variables={{ name, category, description, instructions, username}}
      >
        {
          (addRecipe, {data, loading, error} ) => {

            return !loading ? (
              <div className="AddRecipe container">
                <h2>Add Recipe</h2>
                <form className="flex flex-columns center form" onSubmit={(e) => this.handleSubmit(e, addRecipe)}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Recipe Name"
                    onChange={this.handleChange}
                    value={name}
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
                  <button
                    className="button-primary"
                    disabled={loading || this.isInvalidForm}
                  >
                  Save
                  </button>
                </form>
                { error && <Error error={error}/> }
              </div>
            ) : <h1>Loading...</h1>;

          }
        }
      </Mutation>
    )
  }
};

export default AddRecipe;
