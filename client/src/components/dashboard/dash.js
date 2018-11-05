import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logOutUser } from '../../actions/authActions';
import { getCurrentProfile } from '../../actions/profileActions';
import DashHeader from '../shared/dash-header';
import Spinner from '../shared/spinner';
import MainContent from './main-content';
import NewProfile from './new-profile';

class Dashboard extends Component {
  constructor() {
    super();
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logOutUser();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let name = user.name.split(' ');
    let username = name[0];
    // const { displayAddressForm } = this.state;

    const currentHour = new Date().getHours();
    let greeting = '';
    if (currentHour >= 0 && currentHour < 12) {
      greeting = "it's time to get some breakfast";
    }
    if (currentHour >= 12 && currentHour < 17) {
      greeting = "it's time to get some lunch";
    }
    if (currentHour >= 17 && currentHour < 24) {
      greeting = "it's time to get some dinner";
    }

    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = <MainContent />;
      } else {
        // User is logged in but has no profile
        dashboardContent = <NewProfile user={username} />;
      }
    }

    return (
      <div className="dashboard">
        <DashHeader
          name={username}
          greeting={greeting}
          logOut={this.onLogoutClick}
        />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="dashcontent">{dashboardContent}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logOutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { logOutUser, getCurrentProfile }
)(Dashboard);
