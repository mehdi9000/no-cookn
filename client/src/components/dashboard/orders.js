import React, { Component } from 'react';
// import Mascot from '../../assets/mascot-3.svg';
import Order from '../../assets/orders.svg';

import { Link } from 'react-router-dom';

class Orders extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-12">
            <div className="empty-tab-content-box">
              <div className="img-box">
                <img src={Order} alt="no cookn mascot" width="300px" />
              </div>

              <h4 className="mt-4 mb-3">You haven't placed any orders.</h4>
              <h5 className="text-muted mb-3">
                Check out top restaurants
                <Link to="/">
                  <b> Here. </b>
                </Link>
                We are sure you'll find something you'll love to eat.
              </h5>
              <Link to="/">
                <button className="btn btn-success btn-lg">
                  Top Restautants
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Orders;
