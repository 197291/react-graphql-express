import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { SIGNUP_USER } from '../../queries';

import './signUp.css';

class SignUp extends Component {

  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  }

  handleOnChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  cleanInputValues() {
    this.setState({
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    });
  }

  handleSubmit = (e, signupUser) => {
    e.preventDefault();
    this.cleanInputValues();
    signupUser()
      .then(data => console.log(data));
  }

  render() {
    const { username, password, passwordConfirmation, email } = this.state;
    return (
      <div className="App SignUp">
        <h2 className="App">SignUp</h2>
        <Mutation mutation={SIGNUP_USER} variables={{username, password, email}}>
          {(signupUser, { data, loading, error }) => {

            return loading ? 'Loading...' : (
              <form onSubmit={(e) => this.handleSubmit(e, signupUser)} className="form form-signup">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={this.handleOnChange}
              />
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={email}
                onChange={this.handleOnChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={this.handleOnChange}
              />
              <input
                type="password"
                name="passwordConfirmation"
                placeholder="Confirm password"
                passwordConfirmation={passwordConfirmation}
                onChange={this.handleOnChange}
              />
              <button className="button-primary" type="submit" >Submit</button>
            </form>
            )}
          }
        </Mutation>
      </div>
    );
  }
}

export default SignUp;
