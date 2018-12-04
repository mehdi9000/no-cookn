import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAddress } from '../../actions/profileActions';
import Spinner from '../shared/spinner';
import AddressForm from './address-form';

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      address: [],
      displayAddressForm: false
    };
  }

  onDeleteClick(id) {
    this.props.deleteAddress(id);
  }

  componentWillMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      this.setState({
        address: profile.address
      });
    }
  }

  render() {
    const { displayAddressForm, address } = this.state;
    const { profile, loading } = this.props.profile;

    let addressContent;

    if (profile === null || loading) {
      addressContent = <Spinner />;
    } else if (profile.hasOwnProperty('address')) {
      let pAddress = address;

      if (pAddress.length < 1) {
        addressContent = (
          <div className="mb-3">
            <button
              type="button"
              onClick={() => {
                this.setState({
                  displayAddressForm: !displayAddressForm
                });
              }}
              className="btn btn-info"
            >
              Add an Address
            </button>
            {displayAddressForm ? <AddressForm /> : ' '}
          </div>
        );
      } else {
        if (profile.address.length > 0) {
          addressContent = address.map(address => (
            <div>
              <div className="col-md-6 mb-3" key={address._id}>
                <div className="address-card">
                  <h4 className="text-muted">{address.address1}</h4>
                  <h4 className="text-muted">{address.address2}</h4>
                  <h4 className="text-muted">
                    {address.area}, {address.state}
                  </h4>
                  <i
                    className="fas fa-trash text-danger"
                    onClick={this.onDeleteClick.bind(this, address._id)}
                  />
                  &nbsp; &nbsp; &nbsp; &nbsp;
                  <i className="fas fa-pen text-warning" />
                </div>
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState({
                        displayAddressForm: !displayAddressForm
                      });
                    }}
                    className="btn btn-info"
                  >
                    Add New Address
                  </button>
                </div>
              </div>
              {displayAddressForm ? <AddressForm /> : ' '}
            </div>
          ));
        }
      }
    }
    return (
      <div className="address-book">
        <h5 className="text-muted">Saved Addresses</h5>
        {addressContent}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAddress }
)(Address);
