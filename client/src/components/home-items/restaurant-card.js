import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/lg.jpeg';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class RestaurantCard extends Component {
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
    let logoURL;
    let date = new Date();
    let currentTime = date.getHours();
    console.log(currentTime);
    const { restaurants } = this.props;

    if (window.location.hostname === 'localhost') {
      logoURL = 'http://localhost:4001/';
    } else {
      logoURL = 'http://' + window.location.hostname + '/';
    }
    return (
      <div>
        <div className="row">
          {restaurants.map((restaurant, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div className="card mb-4 box-shadow">
                <img
                  className="card-img-top"
                  src={Logo}
                  alt="restaurant-logo"
                />
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="card-subtitle mb-2 text-muted">
                      <small className="badge badge-custom">
                        {restaurant.categories.map((category, index) => (
                          <b key={index}>{category} • </b>
                        ))}
                      </small>
                    </h6>

                    {restaurant.rating === 0 ? (
                      ''
                    ) : (
                      <h6 className="rating-box">`${restaurant.rating}`</h6>
                    )}
                  </div>
                  <h5 className="card-title">
                    <a
                      href={`/restaurants/${restaurant.restaurant._id}/${
                        restaurant.restaurant.restaurantname
                      }`}
                    >
                      {restaurant.restaurant.restaurantname}
                    </a>
                  </h5>
                  <p className="card-text text-muted">
                    currently open - closes at
                    <b className="text-warning"> {restaurant.closesat}</b>
                  </p>
                  <p className="card-text text-muted">
                    minimum order{' '}
                    <b className="text-danger">{restaurant.minimumorder}</b>
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <Link
                      to={`/restaurants/${restaurant.restaurant._id}/${
                        restaurant.restaurant.restaurantname
                      }`}
                    >
                      <button className="btn btn-sm btn-outline">view</button>
                    </Link>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline"
                      onClick={this.toggle}
                      style={{
                        backgroundColor: 'rgb(233, 249, 240)',
                        color: 'rgb(80, 184, 60)'
                      }}
                    >
                      menu
                    </button>

                    <small className="text-muted">
                      <b>Avg. delivery time {restaurant.deliverytime} mins</b>
                    </small>
                  </div>
                </div>
              </div>
              <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                className={this.props.className}
              >
                <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                <ModalBody>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.toggle}>
                    Do Something
                  </Button>{' '}
                  <Button color="secondary" onClick={this.toggle}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default RestaurantCard;
