import React from 'react';
import BrokeBot from '../../assets/404.svg';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <div className="row">
        <div className="container">
          <div className="not-found">
            <div className="img-box">
              <img src={BrokeBot} className="img-fluid" width="600px" />
            </div>
            <div className="text-box">
              <h4 className="mt-5">Ooops! You broke a link.</h4>
              <h5 className="nt-3 mb-3">
                The page you tried to visit does not exist on our server.
              </h5>
              <h5 className="nt-3 mb-3">
                Why not check out restaurants and discover amazing food.
              </h5>
              <Link to="/">
                <button className="btn btn-lg btn-warning">
                  Top Restaurants
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
