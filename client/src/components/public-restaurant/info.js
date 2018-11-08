import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RestaurantInformation extends Component {
  render() {
    return (
      <div className="restinfo">
        <div className="row">
          <div className="col-md-4">
            <div className="row">
              <div className="col-12">
                <div className="phone-box">
                  <h4 className="title">
                    <b>Phone Number</b>
                  </h4>
                  <h4 className="number">
                    <b>0701717788</b>
                  </h4>
                </div>
              </div>
              <div className="col-12">
                <div className="cuisine-box">
                  <h4 className="title">
                    <b>Cuisines</b>
                  </h4>
                  <span>Nigerian, British, Continental</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="row">
              <div className="col-12">
                <div className="time-box">
                  <h4 className="title">
                    <b>Opening Hours</b>
                  </h4>
                  <h6 className="times">
                    <div className="hour">
                      <b>Mon</b> <span>8am - 8pm</span>
                    </div>
                    <div className="hour">
                      <b>Mon</b> <span>8am - 8pm</span>
                    </div>
                    <div className="hour">
                      <b>Mon</b> <span>8am - 8pm</span>
                    </div>
                    <div className="hour">
                      <b>Mon</b> <span>8am - 8pm</span>
                    </div>
                    <div className="hour">
                      <b>Mon</b> <span>8am - 8pm</span>
                    </div>
                    <div className="hour">
                      <b>Mon</b> <span>8am - 8pm</span>
                    </div>
                    <div className="hour">
                      <b>Mon</b> <span>8am - 8pm</span>
                    </div>
                  </h6>
                </div>
              </div>

              <div className="col-12">
                <div className="address-box">
                  <h4 className="title">
                    <b>Address</b>
                  </h4>
                  <span>2 Kaffi street, Ikeja Alausa, Lagos</span> <br />
                  <Link to="/">Other Branches</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col md-4">
            <div className="feature-box">
              <h4 className="title">
                <b>More Info</b>
              </h4>
              <ul>
                <li>Cash On Delivery</li>
                <li>Special Breakfast</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RestaurantInformation;
