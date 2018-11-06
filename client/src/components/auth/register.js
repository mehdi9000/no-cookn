import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RegistrationForm from './register-form';

class Register extends Component {
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
                    <br />
                    <RegistrationForm />
                    <hr />
                    <p className="text-muted">
                      already have an account?
                      <Link to="/login" className="text-warning">
                        &nbsp; Sign In to Continue
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
export default Register;
