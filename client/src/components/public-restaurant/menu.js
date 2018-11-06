import React, { Component } from 'react';
import Tabs from '../shared/tabs';
import Dummy from '../../assets/header-img.jpg';

class Menu extends Component {
  render() {
    return (
      <div>
        <div className="menu-box">
          <div className="row">
            <div className="col-md-8">
              <div className="menus">
                <div className="menu-tabs">
                  <Tabs>
                    <div label="Main">
                      <ul className="list-unstyled">
                        <li className="media">
                          <img
                            className="mr-3"
                            src={Dummy}
                            alt="Generic placeholde"
                            width="80px"
                            height="80px"
                          />
                          <div className="media-body justify-content">
                            <h5 className="mt-0 mb-1">Pounded Yam</h5>
                            <button className="btn btn-outline-warning btn-sm">
                              <i className="fas fa-plus" />
                            </button>
                          </div>
                        </li>
                        <li className="media my-4">
                          <img
                            className="mr-3"
                            src={Dummy}
                            alt="Generic placeholder"
                            width="80px"
                            height="80px"
                          />
                          <div className="media-body">
                            <h5 className="mt-0 mb-1">Asun</h5>
                          </div>
                        </li>
                        <li className="media">
                          <img
                            className="mr-3"
                            src={Dummy}
                            alt="Generic placeholder"
                            width="80px"
                            height="80px"
                          />
                          <div className="media-body">
                            <h5 className="mt-0 mb-1">Special Fried Rice</h5>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div label="Sides">side content goes in here</div>
                  </Tabs>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="cart">cart stuff goes here</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Menu;
