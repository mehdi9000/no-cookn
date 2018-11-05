import React from 'react';
import { Link } from 'react-router-dom';
import Mail from '../../assets/letter.svg';

const Welcome = () => {
  return (
    <div className="welcome-wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="welcome-info ">
              <img
                src={Mail}
                alt="welcome to no cookn"
                className="mb-3 img-responsive"
              />
              <h3 className="mb-3">Your sign up was successful!</h3>
              <h5 className="mb-3">
                We have sent a mail to you. Use the button in the mail to
                activate your account.
              </h5>
              <Link to="/">
                <button className="btn btn-warning btn-lg">
                  back to homepage
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Welcome;
