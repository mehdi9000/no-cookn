import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

class MenuModal extends Component {
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          toggle={this.props.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.props.toggle}>
            {this.props.item.name}
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="quantity">How Many Plates?</label>
              <select name="quantity" id="quantity" className="form-control">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
              </select>
            </div>

            <br />

            <h5>
              Available Options{' '}
              <small className="text-muted">***Optional***</small>
            </h5>
            <div className="menu-box">
              <div className="menu-info">
                <h5>Jollof Rice</h5>
                <small className="text-muted">
                  <b>Avg Delivery Time: 35 Minutes</b>
                </small>
              </div>
              <div className="ot-box">
                <h5>N1500</h5>
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => this.props.addToCart(this.props.item)}
                >
                  <i className="fas fa-plus" /> Add (
                  {(this.props.cartItem && this.props.cartItem.quantity) || 0})
                </button>

                {this.props.cartItem ? (
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => this.props.removeItem(this.props.cartItem)}
                  >
                    <i className="fas fa-minus" /> Remove
                  </button>
                ) : (
                  ''
                )}
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default MenuModal;
