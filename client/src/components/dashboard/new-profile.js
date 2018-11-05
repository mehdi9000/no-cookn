import React, { Component } from 'react';
import Mascot from '../../assets/mascot-3.svg';
import PhoneForm from './phone-form';

class NewProfile extends Component {
  render() {
    return (
      <div>
        <div className="row justify-content-center">
          <div className="no-profile">
            <div className="col-md-12">
              <div className="imgbox justify-content-center">
                <img src={Mascot} alt="no-cookn mascot" width="180px" />
              </div>
              <br /> <br />
              <p className="welcome-text">
                Welcome, <span>{this.props.user}</span>
              </p>
              <p className="noprofile-info">
                fill out your profile by adding a <b> phone number </b> below
              </p>
              <PhoneForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default NewProfile;
