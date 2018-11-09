import React from 'react';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show
    ? 'modall display-block'
    : 'modall display-none';

  return (
    <div className={showHideClassName}>
      <section className="modal-main">{children}</section>
    </div>
  );
};

export default Modal;
