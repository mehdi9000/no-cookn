import React, { Component } from 'react';
import Order from '../../assets/orders.svg';
import Search from './search';

class EmptyState extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-12">
          <div className="empty-tab-content-box">
            <div className="img-box">
              <img src={Order} alt="no cookn mascot" width="300px" />
            </div>

            <h4 className="mt-4 mb-3">
              We have no restaurants delivering to this location.
            </h4>
            <h5 className="text-muted mb-3">Search another location?</h5>
            <Search />
          </div>
        </div>
      </div>
    );
  }
}
export default EmptyState;
