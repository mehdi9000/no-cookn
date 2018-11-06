import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginForm from './login-form';
import { loginUser } from '../../actions/authActions';

class Login extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }
  render() {
    return (
      <div>
        <div className="auth-wrapper text-center">
          <div className="form-box">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="form-cont">
                    <Link to="/">
                      <span className="float-right text-muted">
                        <i className="fas fa-times " />
                        <br />
                        close
                      </span>
                    </Link>
                    <LoginForm />
                    <hr />
                    <p>
                      Don't have an account?
                      <Link to="/register" className="text-warning">
                        &nbsp; Register to Continue
                      </Link>
                    </p>
                    <br /> <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
