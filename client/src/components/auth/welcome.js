import React from 'react';
import { Link } from 'react-router-dom';
import Success from '../../assets/welcome.svg';

const Welcome = () => {
  return (
    <div className="welcome-wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="welcome-info ">
              <img
                src={Success}
                alt="welcome to no cookn"
                className="mb-5 img-responsive"
              />
              <h3 className="mb-3">Your sign up was successful!</h3>
              <h5 className="mb-4">
                Click the button below to sign in and proceed to your profile.
              </h5>
              <Link to="/login">
                <button className="btn btn-warning btn-lg">Sign In</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Welcome;
