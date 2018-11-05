import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import verify from '../../assets/verified.svg';
import error from '../../assets/error.svg';

import { VerifyUser } from '../../actions/authActions';
import withRouter from 'react-router-dom/withRouter';

class Verification extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };
  }
  componentWillMount() {
    let activationcode = this.props.match.params.activationcode;
    this.props.VerifyUser(activationcode);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="welcome-wrapper">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="welcome-info ">
                {!errors ? (
                  <div>
                    <img
                      src={verify}
                      alt="welcome to no cookn"
                      className="mb-3 img-responsive"
                    />
                    <h3 className="mb-3">Account verification successful!</h3>
                    <h5 className="mb-3">You can now log in to continue.</h5>
                    <Link to="/login">
                      <button className="btn btn-warning btn-lg">login</button>
                    </Link>
                  </div>
                ) : (
                  <div>
                    <img
                      src={error}
                      alt="welcome to no cookn"
                      className="mb-3 img-responsive"
                    />
                    <h3>{errors.errors}</h3>
                    <h5>
                      It seems your account has been activated. you can try to
                      log in. If problem persists, please contact support
                    </h5>
                    <Link to="/login">
                      <button className="btn btn-warning btn-lg">login</button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

VerifyUser.prototype = {
  VerifyUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { VerifyUser }
)(withRouter(Verification));
