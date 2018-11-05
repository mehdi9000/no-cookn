import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DashHeader extends Component {
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
              <Link to="/profile/settings">
                <button className="btn btn-sm btn-settings">
                  <i className="fas fa-cogs" /> settings
                </button>
              </Link>
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
      </div>
    );
  }
}
export default DashHeader;
