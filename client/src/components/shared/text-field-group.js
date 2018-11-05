import React from 'react';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  onChange,
  info,
  disabled,
  error,
  type
}) => {
  return (
    <div>
      <div className="form-group mb-3">
        <input
          className="form-control"
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          name={name}
          value={value}
          disabled={disabled}
        />
        {info && <small className="form-text text-muted">{info}</small>}
        {error && (
          <div
            className="alert alert-danger alert-dismissible scale-up-center"
            role="alert"
          >
            {error}
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
      </div>
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  info: PropTypes.string,
  string: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: 'text'
};

export default TextFieldGroup;
