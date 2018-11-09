import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../shared/modal';
import EditPhoneForm from '../dashboard/edit-phone-form';
import Address from '../dashboard/address';

class DashHeader extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div>
        <div className="dash-header">
          <div className="container">
            <div className="greeting text-center">
              <h3 className="header-text">
                {this.props.name}, {this.props.greeting}
              </h3>
            </div>

            <div className="profile-actions">
              <button
                className="btn btn-sm btn-settings"
                onClick={this.showModal}
              >
                <i className="fas fa-cogs" /> settings
              </button>

              <Link to="/">
                <button className="btn btn-sm btn-home">
                  <i className="fas fa-home " /> homepage
                </button>
              </Link>
              <button
                className="btn btn-sm btn-info"
                onClick={this.props.logOut}
              >
                <i className="fas fa-sign-in-alt" /> logout
              </button>
            </div>
          </div>
        </div>
        <Modal show={this.state.show}>
          <EditPhoneForm close={this.hideModal} />

          <Address />
        </Modal>
      </div>
    );
  }
}
export default DashHeader;
