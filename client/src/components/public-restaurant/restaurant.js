import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRestaurant } from '../../actions/restaurantActions';
// import Spinner from '../shared/spinner';

// import Dummy from '../../assets/header-img.jpg';
import Tabs from '../shared/tabs';
import Menu from './menu';
import Overview from './info';
import Reviews from './reviews';
import MainNav from '../shared/main-nav';

class RestaurantProfile extends Component {
  componentDidMount() {
    let { id } = this.props.match.params;
    this.props.getRestaurant(id);
  }
  render() {
    let { restaurant } = this.props.restaurant;
    console.log('restaurant', restaurant);

    return (
      <div>
        <MainNav />
        <div className="restaurant-header" />
        <div className="tab-box">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="content-box">
                  <Tabs>
                    <div label="Overview">
                      <Overview />
                    </div>
                    <div label="Menu">
                      <Menu />
                    </div>
                    <div label="Reviews">
                      <Reviews />
                    </div>
                    <div label="Photos">
                      <div className="ph-header">
                        <h5>The Place's Showcase</h5>
                      </div>
                    </div>
                  </Tabs>
                </div>
              </div>
              <div className="col-md-4">cart or something</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RestaurantProfile.propTypes = {
  getRestaurant: PropTypes.func.isRequired,
  restaurant: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  restaurant: state.restaurant
});
export default connect(
  mapStateToProps,
  { getRestaurant }
)(RestaurantProfile);
