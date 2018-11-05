import React from 'react';
const ErrorBox = ({ error }) => {
  return (
    <div>
      <div
        className="alert alert-danger alert-dismissible scale-up-center"
        role="alert"
        error={errors.error}
      >
        {this.props.error}
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
};

export default ErrorBox;
