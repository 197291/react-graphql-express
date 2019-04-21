import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { SIGNIN_USER } from '../../queries';
import Error from '../Error';

import './signIn.css';
import { saveToken } from '../../helpers';

class SignIn extends Component {

  state = {
    username: '',
    password: '',
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
      password: '',
    });
  }

  handleSubmit = (e, signinUser) => {
    e.preventDefault();
    if (!this.formIsInvalid) {
      signinUser()
        .then( async ({ data } ) => {
          saveToken(data.signinUser.token);
          console.log('===sign-in====', data);
          await this.props.refetch();
          this.cleanInputValues();
          this.props.history.push('/');
        });
    }
  }

  get formIsInvalid() {
    const { username, password } = this.state;
    return !username || !password;
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className="App SignIn">
        <h2 className="App">SignIn</h2>
        <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
          {(signinUser, { data, loading, error }) => {
            return loading ? 'Loading...' : (
              <form onSubmit={(e) => this.handleSubmit(e, signinUser)} className="form form-signin">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={this.handleOnChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={this.handleOnChange}
              />
              <button className="button-primary" type="submit" >Sign In</button>
              {error && <Error error={error} />}
            </form>
            )}
          }
        </Mutation>
      </div>
    );
  }
}

export default withRouter(SignIn);
