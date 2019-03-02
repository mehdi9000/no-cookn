import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRestaurant } from '../../actions/restaurantActions';
import Spinner from '../shared/spinner';

// import Dummy from '../../assets/header-img.jpg';
import Tabs from '../shared/tabs';
import Menu from './menu';
import Overview from './info';
import Reviews from './reviews';
import MainNav from '../shared/main-nav';
import Cart from './cart';

class RestaurantProfile extends Component {
  componentDidMount() {
    let { id } = this.props.match.params;
    this.props.getRestaurant(id);
  }
  render() {
    let { restaurant } = this.props.restaurant;

    const restaurantname = ((restaurant || {}).restaurant || {}).restaurantname;
    const menu = (restaurant || {}).menu || [];
    const cuisines = (restaurant || {}).cuisines || [];
    const categories = (restaurant || {}).categories || [];
    const phone = (restaurant || {}).phone || [];
    const deliveryareas = (restaurant || {}).deliveryareas || [];
    const paymentsaccepted = (restaurant || {}).paymentsaccepted || [];

    const overviewInfo = {
      categories,
      phone,
      name: restaurantname,
      rating: restaurant.rating,
      deliverytime: restaurant.deliverytime,
      minimumorder: restaurant.minimumorder,
      likes: restaurant.likes,
      opensat: restaurant.opensat,
      closesat: restaurant.closesat,
      cuisines: cuisines.join(', '),
      deliveryareas: deliveryareas.join(', '),
      paymentsaccepted: paymentsaccepted.join(', ')
    };

    let restaurantContent;

    if (restaurant === undefined || null) {
      restaurantContent = <Spinner />;
    } else {
      restaurantContent = (
        <div className="tab-box">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="content-box">
                  <Tabs>
                    <div label="Overview">
                      <Overview info={overviewInfo} />
                    </div>
                    <div label="Menu">
                      <Menu menuItems={menu} />
                    </div>
                    <div label="Reviews">
                      <Reviews name={restaurantname} />
                    </div>
                    <div label="Photos">
                      <div className="ph-header">
                        <h5>{restaurantname}'s Showcase</h5>
                      </div>
                    </div>
                  </Tabs>
                </div>
              </div>
              <div className="col-md-4">
                <div className="cart-box">
                  <Cart />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <MainNav />
        <div className="restaurant-header" />
        {restaurantContent}
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
