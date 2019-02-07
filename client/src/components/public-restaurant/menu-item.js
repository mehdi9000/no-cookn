import React, { Component } from 'react';
import Dummy from '../../assets/header-img.jpg';
import MenuModal from './menu-modal';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import { connect } from 'react-redux';

class MenuItem extends Component {
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
    let item = this.props.menuItem;

    return (
      <div>
        <div className="menu-box">
          <div className="menu-img">
            <img src={Dummy} alt="menu" width="80px" />
          </div>
          <div className="menu-info">
            <h5>{item.name}</h5>
            <small className="text-muted">
              <b>Avg Delivery Time: 35 Minutes</b>
            </small>
            <p>
              Super amazing jollof that can be served with plantain or ceaser's
              salad.
            </p>
          </div>
          <div className="ot-box">
            <h5>N1500</h5>
            <button className="btn btn-sm btn-success" onClick={this.toggle}>
              <i className="fas fa-plus" /> Add
            </button>
          </div>
        </div>
        <MenuModal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          item={item}
          addToCart={this.props.addToCart}
          removeItem={this.props.removeFromCart}
          cartItem={
            this.props.cart.filter(cartItem => cartItem.id === item.id)[0]
          }
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

export default connect(
  mapStateToProps,
  { addToCart, removeFromCart }
)(MenuItem);
