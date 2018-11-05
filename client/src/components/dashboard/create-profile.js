import React, { Component } from 'react';
import DashNav from '../shared/dash-nav';
import AddressForm from './address-form';
class CreateProfile extends Component {
  render() {
    return (
      <div>
        <DashNav />
        <div className="cr-profile">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <div className="form-box">
                  <div className="form-header">
                    <h3 className="display-5">Create Your Profile</h3>
                    <p className="lead text-muted">
                      Let's get some information to make your experience
                      standout
                    </p>
                    <small className="d-block pb-3 text-muted">
                      <b>* = required fields</b>
                    </small>
                    <hr />
                    <div className="form-cont">
                      <AddressForm />
                    </div>
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

export default CreateProfile;
