import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MainNav extends Component {
  render() {
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
                      Restuarants
                    </Link>
                  </li>

                  <li className="nav-item dropdown">
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
                  <li>
                    <Link to="/login">
                      <button className="btn btn-sm mr-3 login-btn">
                        Sign in
                      </button>
                    </Link>
                  </li>

                  <li>
                    <Link to="/register">
                      <button className="btn btn-sm signup-btn">Sign up</button>
                    </Link>
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
export default MainNav;
