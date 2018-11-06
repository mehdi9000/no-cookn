import React, { Component } from 'react';
import Dummy from '../../assets/header-img.jpg';
import Tabs from '../shared/tabs';
import Menu from './menu';
import RestaurantInformation from './info';
import Reviews from './reviews';

class RestaurantProfile extends Component {
  render() {
    return (
      <div>
        <div className="restaurant-header">
          <div className="container">
            <div className="large-header">
              <div className="row">
                <div className="col-md-4">
                  <div className="img-box">
                    <img
                      src={Dummy}
                      alt="restaurant name"
                      className="img-responsive"
                    />
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="info-box">
                    <h3>The Place</h3>
                    <h5>2 Kaffi street, Ikeja Alausa, Lagos</h5>
                    <h6>breakfast • Lunch • Dinner • Snacks</h6>
                    <span className="rest-disp mr-3">
                      <i className="fas fa-star" /> 3.5 (203 customers)
                    </span>

                    <span className="rest-disp mr-3">
                      <i className="fas fa-star" /> Min. Order <b>500</b>
                    </span>

                    <span className="rest-disp mr-3">
                      <i className="fas fa-star" /> Delivery Time 45 minutes
                    </span>
                    <br />
                    <br />
                    <h6>cash on delivery • POS on delivery • Online Payment</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="restaurant-body">
          <div className="container">
            <Tabs>
              <div label="Menu">
                <Menu />
              </div>
              <div label="Info">
                <RestaurantInformation />
              </div>
              <div label="Reviews">
                <Reviews />
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

export default RestaurantProfile;
