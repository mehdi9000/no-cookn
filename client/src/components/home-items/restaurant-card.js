import React, { Component } from 'react';
import Logo from '../../assets/lg.jpeg';

class RestaurantCard extends Component {
  render() {
    const { restaurants } = this.props;
    return (
      <div>
        <div className="row">
          {restaurants.map((restaurant, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div className="card mb-4 box-shadow">
                <img
                  className="card-img-top"
                  src={Logo}
                  alt="restaurant-logo"
                />
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="card-subtitle mb-2 text-muted">
                      <small className="badge badge-custom">
                        <b>{restaurant.categories}</b>
                      </small>
                    </h6>

                    <h6>rating</h6>
                  </div>
                  <h5 className="card-title">
                    <a href="/">{restaurant.restaurant.restaurantname}</a>
                  </h5>
                  <p className="card-text text-muted">
                    currently open - closes at
                    <b className="text-dark"> {restaurant.closesat}</b>
                  </p>
                  <p className="card-text text-muted">
                    minimum order <b className="text-dark">N500</b>
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <button type="button" className="btn btn-sm btn-outline">
                      view
                    </button>
                    <button type="button" className="btn btn-sm btn-outline">
                      menu
                    </button>

                    <small className="text-muted">
                      <b>Avg. delivery time 9 mins</b>
                    </small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default RestaurantCard;
