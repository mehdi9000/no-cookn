import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextFieldGroup from '../shared/text-field-group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginUser } from '../../actions/authActions';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
      submitting: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit(e) {
    e.preventDefault();
    this.setState({ submitting: true });
    const User = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(User);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors, submitting: false });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <form className="form-signin" onSubmit={this.onSubmit}>
          <h1 className="h3 mb-3 mt-3 font-weight-bold">sign in to continue</h1>
          <TextFieldGroup
            type="email"
            name="email"
            placeholder="Email Address"
            value={this.state.email}
            onChange={this.onChange}
            error={errors.email}
          />
          <TextFieldGroup
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onChange}
            error={errors.password}
          />
          {this.state.submitting ? (
            <button
              className="btn btn-lg submit-btn btn-block mt-3  mb-3"
              disabled
            >
              Checking Your Account...
            </button>
          ) : (
            <button
              className="btn btn-lg submit-btn btn-block mt-3  mb-3"
              type="submit"
            >
              Log In
            </button>
          )}
          <p>{errors.error}</p>

          <Link to="/reset-request" className="fg text-muted">
            forgot password?
          </Link>
        </form>
      </div>
    );
  }
}
LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(LoginForm);
