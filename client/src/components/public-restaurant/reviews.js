import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      rating: 4
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
        <div className="rating-box">
          <div className="rating-header">
            <h5 className="mb-3 mt-3">
              <b>What People are saying about The Place.</b>
            </h5>
            <div className="rev">
              <span className="title">Overall Rating</span>
              <span className="rating">3.2</span>
            </div>

            <br />

            <div className="rev">
              <span className="title">Reviews</span>
              <span className="review">10</span>
            </div>
            <br />
            <div className="rev">
              <button className="btn btn-danger" onClick={this.toggle}>
                Write a Review
              </button>
            </div>

            <div className="reviews">
              <div className="box">
                <div className="avatar">
                  <span>WF</span>
                </div>
                <div className="content">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  &nbsp; 4.0
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Accusantium, accusamus. Ducimus iusto omnis, sit itaque
                    beatae quae dolorum, ipsa adipisci tenetur odio est
                    asperiores cumque ad incidunt nemo ut aspernatur!
                  </p>
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Write a Review</ModalHeader>
          <ModalBody>
            <div className="form">
              <form>
                <div className="form-group" style={{ color: '#3e416d' }}>
                  <label htmlFor="rating">Select a Rating for The Place</label>
                  <select name="rating" id="rating" className="form-control">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <i className="fas fa-star" />

                <br />
                <br />

                <div className="form-group">
                  <textarea
                    name="review"
                    id="review"
                    cols="20"
                    rows="5"
                    placeholder="Write your review"
                    className="form-control"
                  />
                </div>
                <button
                  className="btn btn-warning btn-block"
                  style={{ color: 'white' }}
                >
                  Submit Review
                </button>
              </form>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="info" type="button" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default Reviews;
