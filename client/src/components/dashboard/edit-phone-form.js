import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profileActions';
import TextFieldGroup from '../shared/text-field-group';
import Spinner from '../shared/spinner';

class EditPhoneForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      errors: {},
      submitting: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      this.setState({
        phone: profile.phone
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      phone: this.state.phone
    };
    this.props.createProfile(profileData, this.props.history);
  }

  render() {
    const { errors } = this.state;
    const { profile, loading } = this.props.profile;

    let settingContent;

    if (profile === null || loading) {
      settingContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        settingContent = (
          <div className="col-md-12">
            <div className="setting-header">
              <button
                className="btn btn-info btn-sm mr-4"
                onClick={this.props.close}
              >
                <i className="fas fa-arrow-left" /> back
              </button>
            </div>
            <div className="form-box">
              <h5 className="text-muted">Update Your Primary Phone Number</h5>
              <form className="profile-form" onSubmit={this.onSubmit}>
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
                    Updating...
                  </button>
                ) : (
                  <button
                    className="btn btn-lg submit-btn btn-block mt-3  mb-3"
                    type="submit"
                  >
                    Update Phone Number
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
          </div>
        );
      } else {
        settingContent = <h4>Profile empty state here</h4>;
      }
    }

    return (
      <div>
        <div className="row">{settingContent}</div>
      </div>
    );
  }
}
EditPhoneForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
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
)(EditPhoneForm);
