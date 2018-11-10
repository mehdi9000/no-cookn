import React, { Component } from 'react';
// import Mascot from '../../assets/mascot-2.svg';
import Fave from '../../assets/fave.svg';

import { Link } from 'react-router-dom';

class Favourites extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-12">
            <div className="empty-tab-content-box">
              <div className="img-box">
                <img src={Fave} alt="no cookn mascot" width="300px" />
              </div>

              <h4 className="mt-4 mb-3">
                You haven't favourited any restaurants.
              </h4>
              <h5 className="text-muted mb-3">
                Check out restaurants with amazing menu and favourite them so
                you don't forget them.
              </h5>
              <Link to="/">
                <button className="btn btn-success btn-lg">
                  Browse Resrautants
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Favourites;
