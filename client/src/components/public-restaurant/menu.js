import React, { Component } from 'react';
import Tabs from '../shared/tabs';
import Dummy from '../../assets/header-img.jpg';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  render() {
    return (
      <div>
        <Tabs>
          <div label="Mains">
            <div className="menu-box">
              <div className="menu-img">
                <img src={Dummy} alt="menu" width="80px" />
              </div>
              <div className="menu-info">
                <h5>Jollof Rice</h5>
                <small className="text-muted">
                  <b>Avg Delivery Time: 35 Minutes</b>
                </small>
                <p>
                  Super amazing jollof that can be served with plantain or
                  ceaser's salad.
                </p>
              </div>
              <div className="ot-box">
                <h5>N1500</h5>
                <button
                  className="btn btn-sm btn-success"
                  onClick={this.toggle}
                >
                  <i className="fas fa-plus" /> Add
                </button>
              </div>
            </div>
          </div>
          <div label="Side">Sides go here</div>
          <div label="Drinks">Drinks</div>
        </Tabs>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Jollof Rice</ModalHeader>
          <ModalBody>
            <form>
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
                    onClick={this.toggle}
                  >
                    <i className="fas fa-plus" /> Add
                  </button>
                </div>
              </div>
            </form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default Menu;
