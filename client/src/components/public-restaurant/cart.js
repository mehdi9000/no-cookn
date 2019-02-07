import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dummy from '../../assets/header-img.jpg';
import Emptycart from '../../assets/emptycart.svg';
import { addToCart, removeFromCart } from '../../actions/cartActions';

function Sort(items) {
  return items.sort((a, b) => a.id < b.id);
}

class Cart extends Component {
  render() {
    const { cart } = this.props;
    let cartContent;

    if (cart.length >= 1) {
      cartContent = Sort(
        cart.map((item, index) => (
          <div className="cart-item" key={index}>
            <div className="cart-img">
              <img src={Dummy} alt="No-Cookn" width="80px" />
            </div>
            <div className="item-info">
              <h6>
                <b>{item.name}</b>
              </h6>
              <p className="text-muted">
                <b>selected options</b>
              </p>
            </div>
            <div className="item-actions">
              <div className="item-price">
                <h6>{item.price * item.quantity}</h6>
              </div>
              <div className="actions">
                <button
                  className="btn btn-sm plus mr-2"
                  onClick={() => this.props.addToCart(item)}
                >
                  <i className="fa fa-plus" />
                </button>
                <span class="badge">{item.quantity}</span>
                <button
                  className="btn btn-sm minus ml-2"
                  onClick={() => this.props.removeFromCart(item)}
                >
                  <i className="fa fa-minus" />
                </button>
              </div>
            </div>
          </div>
        ))
      );
    } else {
      cartContent = (
        <div className="emptycartbox">
          <div className="imagebox">
            {' '}
            <img src={Emptycart} alt="Emptycart" width="80px" />
          </div>
          <div className="textbox text-center">
            <h4>Your basket is empty.</h4>
            <p className="text-muted">
              explore restaurant menu to add delicious food to your basket.
            </p>
          </div>
        </div>
      );
    }

    console.log('cart: ', cart);
    return (
      <div>
        cart is here
        <hr />
        {cartContent}
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
)(Cart);
