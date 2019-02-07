import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

class Overview extends Component {
  render() {
    return (
      <div className="overview-box">
        <h1>{this.props.info.name}</h1>
        <hr />
        <div className="meta-box">
          <b>
            <i className="fas fa-star" /> {this.props.info.rating}
          </b>
          &nbsp; &nbsp;
          <b>
            <i className="fas fa-utensils" /> {this.props.info.cuisines}
          </b>{' '}
          &nbsp; &nbsp;{' '}
          <b>
            <i className="fas fa-money-check-alt" /> N2000
          </b>{' '}
          &nbsp; &nbsp;
          <b>
            <i className="fas fa-heart" /> {this.props.info.likes}
          </b>{' '}
          &nbsp; &nbsp;
        </div>

        <div className="cat-box mt-3">
          <span className="p-title">Categories: </span>
          {this.props.info.categories.map((item, index) => (
            <span className="pills" key={index}>
              {item}
            </span>
          ))}{' '}
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
                  <span>
                    <b>{this.props.info.opensat}</b> -{' '}
                    <b>{this.props.info.closesat}</b>
                  </span>
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
                  {this.props.info.phone.map((item, index) => (
                    <a href={`tel: ${item}`} key={index}>
                      {item}
                    </a>
                  ))}
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
                  <span>{this.props.info.deliveryareas}</span>
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
                  <span>{this.props.info.paymentsaccepted}</span>
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
                  <span>{this.props.info.deliverytime} Minutes</span>
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
