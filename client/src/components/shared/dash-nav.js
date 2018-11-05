import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DashNav extends Component {
  render() {
    return (
      <div>
        <header>
          <nav className="dashnav navbar navbar-expand-sm sticky-top">
            <div className="container">
              <Link className="navbar-brand" to="/">
                no-cookn
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarsExample08"
                aria-controls="navbarsExample08"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>

              <div className="collapse navbar-collapse" id="navbarsExample08">
                <ul className="dash navbar-nav ml-auto">
                  <li
                    className="nav-link dropdown-toggle"
                    id="dropdown08"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {this.props.name}
                    <div className="dropdown-menu" aria-labelledby="dropdown08">
                      <Link className="dropdown-item" to="/">
                        Edit Profile
                      </Link>
                      <Link className="dropdown-item" to="/">
                        Logout
                      </Link>
                    </div>
                  </li>
                  <li>
                    <button
                      className="btn btn-sm mr-3 login-btn"
                      onClick={this.props.logOut}
                    >
                      Log out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}
export default DashNav;
