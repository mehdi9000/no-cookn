import React, { Component } from 'react';
import { connect } from 'react-redux';

class Cart extends Component {
  render() {
    return <div>cart is here</div>;
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}
export default connect(mapStateToProps)(Cart);
