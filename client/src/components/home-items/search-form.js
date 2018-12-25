import React, { Component } from 'react';
import Options from '../../utils/options';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRestaurantsByLocation } from '../../actions/restaurantActions';
import { withRouter } from 'react-router-dom';

let options = Options.deliveryareas;

class SearchForm extends Component {
  constructor() {
    super();
    this.queryRef = React.createRef();

    this.state = {
      query: '',
      show: false,
      results: []
    };
    this.onChange = this.onChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }
  onChange = e => {
    this.setState({ query: this.queryRef.current.value });
  };

  handleCheck(e) {
    let newQuery = { location: e.currentTarget.dataset.id };
    localStorage.setItem('location', e.currentTarget.dataset.id);
    this.props.getRestaurantsByLocation(newQuery, this.props.history);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.restaurant) {
  //     const { restaurant } = this.state;
  //     this.setState({ results: restaurant });
  //     console.log(this.state.results);
  //   }
  // }

  render() {
    let { query } = this.state;
    const filteredResults = options.filter(function(word) {
      if (query.length > 0) {
        return word.value.includes(query);
      }
      return filteredResults;
    });

    let { restaurant } = this.props.restaurant;

    return (
      <div>
        <div className="form-container">
          <form className="landing-form">
            <div className="form-row">
              <div className="form-group col-md-10">
                <input
                  type="text"
                  className="form-control"
                  name="query"
                  ref={this.queryRef}
                  onChange={this.onChange}
                  placeholder="Where do you want your food delivered?"
                  autoComplete="off"
                />
                {filteredResults.length ? (
                  <div className="results-box">
                    <ul>
                      {filteredResults.map((word, index) => (
                        <li
                          key={index}
                          data-id={word.value}
                          onClick={this.handleCheck}
                        >
                          {word.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  ''
                )}
              </div>
              {/* <div className="form-group col-md-2">
                <button className="btn search-btn">Show Restaurants</button>
              </div> */}
            </div>
          </form>
        </div>
      </div>
    );
  }
}
SearchForm.propTypes = {
  getRestaurantsByLocation: PropTypes.func.isRequired,
  restaurant: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  restaurant: state.restaurant
});
export default connect(
  mapStateToProps,
  { getRestaurantsByLocation }
)(withRouter(SearchForm));
