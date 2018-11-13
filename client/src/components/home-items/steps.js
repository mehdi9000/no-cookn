import React from 'react';
import Search from '../../assets/search.svg';
import Menu from '../../assets/menu.svg';
import Delivery from '../../assets/delivery.svg';

function Steps() {
  return (
    <div>
      <div class="steps">
        <div class="container">
          <h3 className="mb-4 text-center pb-4">How it Works</h3>
          <div class="row">
            <div class="col-md-4 mb-3">
              <div class="card">
                <div class="card-body">
                  <div class="img-cont">
                    <img src={Search} alt="" />
                  </div>
                  <div class="title mt-4">
                    <h4>Search</h4>
                  </div>
                  <p class="card-text text-muted">
                    Discover restauarants around any location you want your food
                    delivered.
                  </p>
                </div>
              </div>
            </div>

            <div class="col-md-4 mb-3">
              <div class="card">
                <div class="card-body">
                  <div class="img-cont">
                    <img src={Menu} alt="" />
                  </div>
                  <div class="title mt-4">
                    <h4>Order</h4>
                  </div>
                  <p class="card-text text-muted">
                    Explore restauarant menus and discover amazing food you'll
                    love.
                  </p>
                </div>
              </div>
            </div>

            <div class="col-md-4 mb-3">
              <div class="card">
                <div class="card-body">
                  <div class="img-cont">
                    <img src={Delivery} alt="" />
                  </div>
                  <div class="title mt-4">
                    <h4>Delivery</h4>
                  </div>
                  <p class="card-text text-muted">
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
