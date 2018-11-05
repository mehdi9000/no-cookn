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
                    <RegistrationForm />
                    <hr />
                    <Link to="/login" className="text-warning">
                      already have an account?
                    </Link>
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
