import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Overview extends Component {
  render() {
    return (
      <div className="overview-box">
        <h1>The Place</h1>
        <hr />
        <div className="meta-box">
          <b>
            <i className="fas fa-star" /> 3.2
          </b>
          &nbsp; &nbsp;
          <b>
            <i className="fas fa-utensils" /> Nigerian•African
          </b>{' '}
          &nbsp; &nbsp;{' '}
          <b>
            <i className="fas fa-money-check-alt" /> N2000
          </b>{' '}
          &nbsp; &nbsp;
          <b>
            <i className="fas fa-heart" /> 0
          </b>{' '}
          &nbsp; &nbsp;
        </div>

        <div className="cat-box mt-3">
          <span className="p-title">Categories: </span>
          <span className="pills">Fast Food</span>{' '}
          <span className="pills">Family</span>{' '}
          <span className="pills">Fit Fam</span>
        </div>

        <div className="row mt-5">
          <div className="col-lg-6">
            <div className="info-box">
              <div className="item-box">
                <div className="icon">
                  <i className="fas fa-clock" />
                </div>
                <div className="text">
                  <span>
                    <b>Hours of Operation</b>
                  </span>
                  <span>9-5</span>
                </div>
              </div>

              <div className="item-box">
                <div className="icon">
                  <i className="fas fa-phone" />
                </div>
                <div className="text">
                  <span>
                    <b>Phone Number</b>
                  </span>
                  <span>07017177788</span>
                </div>
              </div>

              <div className="item-box">
                <div className="icon">
                  <i className="fas fa-truck" />
                </div>
                <div className="text">
                  <span>
                    <b>Delievry Areas</b>
                  </span>
                  <span>Ikeja, Ikosi, Magodo Phase 1</span>
                </div>
              </div>

              <div className="item-box">
                <div className="icon">
                  <i className="fas fa-credit-card" />
                </div>
                <div className="text">
                  <span>
                    <b>Payments Accepted</b>
                  </span>
                  <span>Cash, POS, POS On Delivery</span>
                </div>
              </div>

              <div className="item-box">
                <div className="icon">
                  <i className="fas fa-stopwatch" />
                </div>
                <div className="text">
                  <span>
                    <b>Average Delivery Time</b>
                  </span>
                  <span>40 Minutes</span>
                </div>
              </div>

              <div className="item-box">
                <div className="icon">
                  <i className="fas fa-stopwatch" />
                </div>
                <div className="text">
                  <span>
                    <b>Website</b>
                  </span>
                  <span>
                    <a
                      href="http://no-cookn.herokuapp.com"
                      target="_blank"
                      style={{ color: 'red' }}
                      rel="noopener noreferrer"
                    >
                      http://no-cookn.herokuapp.com
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="info-box">
              <div className="item-box">
                <div className="icon">
                  <i className="fas fa-hotel" />
                </div>
                <div className="text">
                  <span>
                    <b>Address</b>
                  </span>
                  <span>
                    {' '}
                    <b style={{ color: 'red' }}>57, Marina, Lagos Island.</b>
                  </span>
                  <span>Other Branches</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Overview;
