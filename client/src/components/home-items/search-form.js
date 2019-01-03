import React, { Component } from 'react';
import Options from '../../utils/options';
import Select from 'react-select';

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
      selectedOption: null,
      results: []
    };
    this.onChange = this.onChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange = e => {
    this.setState({ query: this.queryRef.current.value });
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption.value);
  };

  handleCheck(e) {
    let newQuery = { location: e.currentTarget.dataset.id };
    localStorage.setItem('location', e.currentTarget.dataset.id);
    this.props.getRestaurantsByLocation(newQuery, this.props.history);
  }

  onSubmit(e) {
    e.preventDefault();
    let { selectedOption } = this.state;
    console.log('selectedOption', selectedOption.value);
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

    // let { restaurant } = this.props.restaurant;

    return (
      <div>
        <div className="form-container">
          <form className="landing-form" onSubmit={this.onSubmit}>
            <div className="form-row">
              <div className="form-group col-md-10">
                <Select
                  value={this.state.selectedOption}
                  onChange={this.handleChange}
                  options={options}
                  name="selectedOption"
                  placeholder="Select Delivery Area"
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
