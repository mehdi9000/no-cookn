import React, { Component } from 'react';

class SearchForm extends Component {
  render() {
    return (
      <div>
        <div className="form-container">
          <form className="landing-form">
            <div className="form-row">
              <div className="form-group col-md-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Select Your Area"
                />
              </div>

              <div className="form-group col-md-2">
                <button className="btn search-btn">Show Restaurants</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default SearchForm;
