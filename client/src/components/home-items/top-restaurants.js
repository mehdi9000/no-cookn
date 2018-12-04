import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRestaurants } from '../../actions/restaurantActions';
import Spinner from '../shared/spinner';
import RestaurantCard from './restaurant-card';

class TopRestaurants extends Component {
  componentDidMount() {
    this.props.getRestaurants();
  }
  render() {
    const { restaurants, loading } = this.props.restaurant;
    let restauantContent;

    if (restaurants === null || loading) {
      restauantContent = <Spinner />;
    } else {
      restauantContent = <RestaurantCard restaurants={restaurants} />;
      // <PostFeed posts={posts} />
    }
    return (
      <div>
        <div className="restaurants">
          <div className="container">
            <div className="cards">
              <h3 className="title pt-4">Top Restaurants</h3>
              <hr />

              {restauantContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
TopRestaurants.propTypes = {
  getRestaurants: PropTypes.func.isRequired,
  restaurant: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  restaurant: state.restaurant
});
export default connect(
  mapStateToProps,
  { getRestaurants }
)(TopRestaurants);
