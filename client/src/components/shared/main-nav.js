import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { logOutUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class MainNav extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;

    const guestNav = (
      <span>
        {' '}
        <li>
          <Link to="/login">
            <button className="btn btn-sm mr-2 login-btn">Sign In</button>
          </Link>
        </li>
        <li>
          <Link to="/register">
            <button className="btn btn-sm signup-btn">Sign Up</button>
          </Link>
        </li>
      </span>
    );

    const authNav = (
      <span>
        <li style={{ marginTop: '5px', fontWeight: '500' }}>
          <Link to="/dashboard">
            <button className="btn btn-sm mr-2 login-btn">My Profile</button>
          </Link>
        </li>
        {/* <li>
          <Link to="/">
            <button className="btn btn-sm signup-btn">Logout</button>
          </Link>
        </li> */}
      </span>
    );

    return (
      <div>
        <header>
          <nav className="navbar navbar-expand-sm bg-dark navbar-dark sticky-top">
            <div className="container">
              <Link className="navbar-brand" to="/">
                no-cookn
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarsExample07"
                aria-controls="navbarsExample07"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>

              <div className="collapse navbar-collapse" id="navbarsExample07">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item active">
                    <Link className="nav-link" to="/">
                      Home <span className="sr-only">(current)</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Restaurants
                    </Link>
                  </li>

                  <li className="nav-item dropdown mr-3">
                    <Link
                      to="/"
                      className="nav-link dropdown-toggle"
                      id="dropdown07"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Help
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="dropdown07">
                      <Link className="dropdown-item" to="/">
                        FAQs
                      </Link>
                      <Link className="dropdown-item" to="/">
                        Contact Support
                      </Link>
                    </div>
                  </li>
                  {isAuthenticated ? authNav : guestNav}

                  {/* <li className="nav-item dropdown mr-3">
                    Cart{' '}
                    {this.props.cart.reduce((acc, item) => {
                      return acc + item.quantity;
                    }, 0)}
                  </li> */}
                </ul>
              </div>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}
MainNav.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  cart: state.cart
});
export default connect(
  mapStateToProps,
  { logOutUser }
)(MainNav);
