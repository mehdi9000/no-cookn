import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAddress } from '../../actions/profileActions';
import EditPhoneForm from './edit-phone-form';
import AddressForm from './address-form';
import Spinner from '../shared/spinner';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      displayAddressForm: false,
      show: false
    };
  }

  componentWillMount() {
    this.props.getCurrentProfile();
  }
  onDeleteClick(id) {
    this.props.deleteAddress(id);
  }
  render() {
    const { displayAddressForm } = this.state;
    const { profile, loading } = this.props.profile;
    // let addresses = profile.address;

    let address;

    if (profile === null || loading) {
      address = <Spinner />;
    } else {
      address = <p>nothing here</p>;
      // address = profile.address.map(address => (
      //   <div className="col-md-4" key={address._id}>
      //     <div className="address-card">
      //       <h4 className="text-muted">{address.address1}</h4>
      //       <h4 className="text-muted">{address.address2}</h4>
      //       <h4 className="text-muted">
      //         {address.area}, {address.state}
      //       </h4>
      //       <i
      //         className="fas fa-trash text-danger"
      //         onClick={this.onDeleteClick.bind(this, address._id)}
      //       />
      //       &nbsp; &nbsp;
      //       <i className="fas fa-pen text-warning" />
      //     </div>
      //   </div>
      // ));
    }

    return (
      <div className="dashboard">
        <div className="row">
          <div className="container">
            <div className="col-md-8 offset-md-2">
              <div className="edit-profile">
                <EditPhoneForm />

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
                    Add an address
                  </button>
                </div>

                {this.state.displayAddressForm ? <AddressForm /> : ' '}
                <div className="row">{address}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditPhoneForm.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAddress }
)(Settings);
