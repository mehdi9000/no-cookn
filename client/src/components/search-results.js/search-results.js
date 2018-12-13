import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MainNav from '../shared/main-nav';
import Footer from '../shared/footer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRestaurantsByLocation } from '../../actions/restaurantActions';
import Spinner from '../shared/spinner';
import SearchCard from '../shared/search-cards';
import Logo from '../../assets/lg.jpeg';
import SearchForm from '../home-items/search-form';

let locationValue = localStorage.getItem('location');

class SearchResults extends Component {
  componentDidMount() {
    console.log(locationValue);
    let newQuery = { location: locationValue };
    this.props.getRestaurantsByLocation(newQuery, this.props.history);
  }

  render() {
    const { restaurant, loading } = this.props.restaurant;
    let searchContent;
    if (loading) {
      searchContent = <Spinner />;
    } else {
      if (restaurant.length > 0) {
        searchContent = <SearchCard restaurants={restaurant} />;
      } else {
        searchContent = (
          <h1>We don't have restaurants delivering to this location.</h1>
        );
      }
    }
    return (
      <div className="results">
        <MainNav />
        <div className="container-fluid mt-3">
          <div className="header">
            <div className="query">
              <h5>
                <i className="far fa-compass" /> Restaurants delivering to:{' '}
                <b>{locationValue}</b>
              </h5>
              <h6>Showing {restaurant.length} restuarant(s)</h6>
            </div>
            <div className="search">
              <input
                type="text"
                className="form-control"
                placeholder="search"
              />
              {/* <SearchForm /> */}
            </div>

            <div className="option">
              <select className="form-control">
                <option value="Order Price">Sort</option>
              </select>

              <select className="form-control">
                <option value="Order Price">Filter</option>
              </select>
            </div>
          </div>

          <div className="restaurants">
            <div className="cards">{searchContent}</div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

SearchResults.propTypes = {
  getRestaurantsByLocation: PropTypes.func.isRequired,
  restaurant: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  restaurant: state.restaurant
});
export default connect(
  mapStateToProps,
  { getRestaurantsByLocation }
)(withRouter(SearchResults));
