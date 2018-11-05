import React, { Component } from 'react';
import TextFieldGroup from '../shared/text-field-group';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createProfile } from '../../actions/profileActions';

class PhoneForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      message: '',
      errors: {},
      submitting: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit(e) {
    e.preventDefault();
    this.setState({ submitting: true });
    const profileData = {
      phone: this.state.phone
    };
    this.props.createProfile(profileData, this.props.history);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors, submitting: false });
    }
  }
  render() {
    const { errors, message } = this.state;
    console.log(message);
    return (
      <div className="form-box" onSubmit={this.onSubmit}>
        {this.state.message ? (
          <div
            className="alert alert-success alert-dismissible scale-up-center"
            role="alert"
          >
            {message}
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        ) : (
          ''
        )}
        <form className="profile-form">
          <TextFieldGroup
            type="text"
            name="phone"
            placeholder="Primary Phone Number"
            value={this.state.phone}
            onChange={this.onChange}
            error={errors.phone}
          />
          {this.state.submitting ? (
            <button
              className="btn btn-lg submit-btn btn-block mt-3  mb-3"
              disabled
            >
              processing...
            </button>
          ) : (
            <button
              className="btn btn-lg submit-btn btn-block mt-3  mb-3"
              type="submit"
            >
              add a phone number
            </button>
          )}
          {errors.error && (
            <div
              className="alert alert-danger alert-dismissible scale-up-center"
              role="alert"
            >
              {errors.error}
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}
        </form>
      </div>
    );
  }
}

PhoneForm.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(PhoneForm));
