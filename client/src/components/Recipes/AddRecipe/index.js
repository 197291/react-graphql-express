import React from 'react';

class AddRecipe extends React.Component {

  state = {
    name: '',
    category: 'Breakfast',
    instructions: '',
    description: '',
    username: ''
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit() {
    console.log('submit');
  }

  render() {
    const { name, category, description, instructions } = this.state;
    return (
      <div className="AddRecipe container">
        <h2>Add Recipe</h2>
        <form className="flex flex-columns center form">
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
          <button onClick={this.handleSubmit} className="button-primary">Save</button>
        </form>
      </div>
    );
  }
};

export default AddRecipe;
