import React, { Component } from 'react';
import Logo from '../../assets/lg.jpeg';

class TopRestaurants extends Component {
  render() {
    return (
      <div>
        <div className="restaurants">
          <div className="container">
            <div className="cards">
              <h3 className="title pt-4">Top Restaurants</h3>
              <hr />

              <div className="row">
                <div className="col-lg-4 col-md-6">
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
                            <b>Fast Food • Breakfast</b>
                          </small>
                        </h6>

                        <h6>rating</h6>
                      </div>
                      <h5 className="card-title">
                        <a href="/">The Place</a>
                      </h5>
                      <p className="card-text text-muted">
                        currently open - closes at
                        <b className="text-dark"> 9pm</b>
                      </p>
                      <p className="card-text text-muted">
                        minimum order <b className="text-dark">N500</b>
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline"
                        >
                          view
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline"
                        >
                          menu
                        </button>

                        <small className="text-muted">
                          <b>Avg. delivery time 9 mins</b>
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
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
                            <b>Fast Food • Breakfast</b>
                          </small>
                        </h6>

                        <h6>rating</h6>
                      </div>
                      <h5 className="card-title">
                        <a href="/">The Place</a>
                      </h5>
                      <p className="card-text text-muted">
                        currently open - closes at
                        <b className="text-dark"> 9pm</b>
                      </p>
                      <p className="card-text text-muted">
                        minimum order <b className="text-dark">N500</b>
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          view
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          menu
                        </button>
                        <small className="text-muted">
                          <b>Avg. delivery time 9 mins</b>
                        </small>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
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
                            <b>Fast Food • Breakfast</b>
                          </small>
                        </h6>

                        <h6>rating</h6>
                      </div>
                      <h5 className="card-title">
                        <a href="/">The Place</a>
                      </h5>
                      <p className="card-text text-muted">
                        currently open - closes at
                        <b className="text-dark"> 9pm</b>
                      </p>
                      <p className="card-text text-muted">
                        minimum order <b className="text-dark">N500</b>
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline"
                        >
                          view
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline"
                        >
                          menu
                        </button>

                        <small className="text-muted">
                          <b>Avg. delivery time 9 mins</b>
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default TopRestaurants;
