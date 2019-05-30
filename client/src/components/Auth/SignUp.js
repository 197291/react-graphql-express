import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { SIGNUP_USER } from '../../queries';
import Error from '../Error';

import './signUp.css';
import { saveToken } from '../../helpers';

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
    if (!this.formIsInvalid) {
      signupUser()
        .then( async (data) => {
          saveToken(data.signunUser.token);

          await this.props.refetch();
          this.cleanInputValues();
          this.props.history.push('/');
        });
    }
  }

  get formIsInvalid() {
    const { username, password, passwordConfirmation, email } = this.state;
    const isInvalid =
    !username || !password || !email || !passwordConfirmation || (password && password !== passwordConfirmation);
    return isInvalid;
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
                value={passwordConfirmation}
                onChange={this.handleOnChange}
              />
              <button className="button-primary" type="submit" >Submit</button>
              {error && <Error error={error} />}
            </form>
            )}
          }
        </Mutation>
      </div>
    );
  }
}

export default withRouter(SignUp);
