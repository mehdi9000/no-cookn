import React, { Component } from "react";
// import Logo from "../../assets/lg.jpeg";

class SearchCard extends Component {
  render() {
    let logoURL;
    let date = new Date();
    let currentTime = date.getHours();
    console.log(currentTime);
    const { restaurants } = this.props;

    if (window.location.hostname === "localhost") {
      logoURL = "http://" + window.location.hostname + ":4001/";
    } else {
      logoURL = "http://" + window.location.hostname + "/";
    }
    return (
      <div>
        <div className="row">
          {restaurants.map((restaurant, index) => (
            <div className="col-lg-3 col-md-6" key={index}>
              <div className="card mb-4 box-shadow">
                <img
                  className="card-img-top"
                  src={logoURL}
                  alt="restaurant-logo"
                />
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="card-subtitle mb-2 text-muted">
                      <small className="badge badge-custom">
                        {restaurant.categories.map((category, index) => (
                          <b key={index}>{category} • </b>
                        ))}
                      </small>
                    </h6>

                    {restaurant.rating === 0 ? (
                      ""
                    ) : (
                      <h6 className="rating-box">`${restaurant.rating}`</h6>
                    )}
                  </div>
                  <h5 className="card-title">
                    <a href="/">{restaurant.restaurant.restaurantname}</a>
                  </h5>
                  <p className="card-text text-muted">
                    currently open - closes at
                    <b className="text-warning"> {restaurant.closesat}</b>
                  </p>
                  <p className="card-text text-muted">
                    minimum order{" "}
                    <b className="text-danger">{restaurant.minimumorder}</b>
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <button type="button" className="btn btn-sm btn-outline">
                      view
                    </button>
                    <button type="button" className="btn btn-sm btn-outline">
                      menu
                    </button>

                    <small className="text-muted">
                      <b>Avg. delivery time {restaurant.deliverytime} mins</b>
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
export default SearchCard;
