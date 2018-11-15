import React from 'react';
import Search from '../../assets/search.svg';
import Menu from '../../assets/menu.svg';
import Delivery from '../../assets/delivery.svg';

function Steps() {
  return (
    <div>
      <div className="steps">
        <div className="container">
          <h3 className="mb-4 text-center pb-4">How it Works</h3>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="img-cont">
                    <img src={Search} alt="" />
                  </div>
                  <div className="title mt-4">
                    <h4>Search</h4>
                  </div>
                  <p className="card-text text-muted">
                    Discover restauarants around any location you want your food
                    delivered.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="img-cont">
                    <img src={Menu} alt="" />
                  </div>
                  <div className="title mt-4">
                    <h4>Order</h4>
                  </div>
                  <p className="card-text text-muted">
                    Explore restauarant menus and discover amazing food you'll
                    love.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="img-cont">
                    <img src={Delivery} alt="" />
                  </div>
                  <div className="title mt-4">
                    <h4>Delivery</h4>
                  </div>
                  <p className="card-text text-muted">
                    Submit your order and wait while we get your food to you
                    safely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Steps;
