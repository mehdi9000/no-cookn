import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../shared/text-field-group';

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
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
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
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
          <h1 className="h3 mb-3 mt-3 font-weight-bold">Create an Account</h1>
          <TextFieldGroup
            type="text"
            onChange={this.onChange}
            placeholder="Full Name"
            name="name"
            error={errors.name}
            value={this.state.name}
          />

          <TextFieldGroup
            type="email"
            placeholder="Email Address"
            onChange={this.onChange}
            name="email"
            error={errors.email}
            value={this.state.email}
          />
          <TextFieldGroup
            type="password"
            placeholder="Password"
            onChange={this.onChange}
            name="password"
            error={errors.password}
            value={this.state.password}
            info="Password must be at least 8 characters"
          />

          <TextFieldGroup
            type="password"
            placeholder="Confirm Password"
            onChange={this.onChange}
            name="password2"
            error={errors.password2}
            value={this.state.password2}
          />

          {this.state.submitting ? (
            <button
              className="btn btn-lg submit-btn btn-block mt-3  mb-3"
              disabled
            >
              Creating Your Account...
            </button>
          ) : (
            <button
              className="btn btn-lg submit-btn btn-block mt-3  mb-3"
              type="submit"
            >
              Create My Account
            </button>
          )}
        </form>
      </div>
    );
  }
}
RegistrationForm.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(RegistrationForm));
