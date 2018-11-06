import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../shared/text-field-group';
import SelectListGroup from '../shared/select-list-group';
import { createAddress } from '../../actions/profileActions';

class AddressForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address1: '',
      address2: '',
      state: '',
      area: '',
      default: false,
      submitting: false,
      disabled: false,
      errors: {},
      message: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      default: !this.state.default
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ submitting: true });
    const addressData = {
      address1: this.state.address1,
      address2: this.state.address2,
      state: this.state.state,
      area: this.state.area,
      default: this.state.default
    };
    this.props.createAddress(addressData);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors, submitting: false });
    }
  }

  render() {
    const { errors } = this.state;
    const options = [
      { label: 'Select Your Area', value: 0 },
      { label: 'Alimosho', value: 'Alimosho' },
      { label: 'Ajerom-Ifelodun', value: 'Ajerom-Ifelodun' },
      { label: 'Kosofe', value: 'Kosofe' },
      { label: 'Mushin', value: 'Mushin' },
      { label: 'Oshodi-Isolo', value: 'Oshodi-Isolo' }
    ];
    const stateOptions = [
      { label: 'Select A State', value: 0 },
      { label: 'Lagos', value: 'Lagos' }
    ];
    return (
      <div className="form-box">
        <form className="profile-form" onSubmit={this.onSubmit}>
          <TextFieldGroup
            type="text"
            name="address1"
            placeholder="Address"
            onChange={this.onChange}
            value={this.state.address1}
            error={errors.address1}
          />

          <TextFieldGroup
            type="text"
            name="address2"
            placeholder="Address Line 2"
            value={this.state.address2}
            onChange={this.onChange}
            error={errors.address2}
          />
          <div className="row">
            <div className="col-md-6">
              <SelectListGroup
                name="area"
                placeholder="Which Area Do you Stay?"
                value={this.state.area}
                options={options}
                onChange={this.onChange}
                error={errors.area}
              />
            </div>

            <div className="col-md-6">
              <SelectListGroup
                name="state"
                placeholder="Select Your State"
                value={this.state.state}
                options={stateOptions}
                onChange={this.onChange}
                error={errors.state}
              />
            </div>
          </div>
          <div className="form-check mb-4">
            <input
              type="checkbox"
              className="form-check-input"
              name="current"
              value={this.state.default}
              checked={this.state.default}
              onChange={this.onCheck}
              id="default"
            />
            <label htmlFor="default" className="form-check-label">
              Set as Default Address
            </label>
          </div>
          {this.state.submitting ? (
            <button
              className="btn btn-lg submit-btn btn-block mt-3  mb-3"
              disabled
            >
              Adding Address to Profile...
            </button>
          ) : (
            <button
              className="btn btn-lg submit-btn btn-block mt-3  mb-3"
              type="submit"
            >
              Add an Address
            </button>
          )}
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

AddressForm.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
export default connect(
  mapStateToProps,
  { createAddress }
)(AddressForm);
