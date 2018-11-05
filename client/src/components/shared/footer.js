import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <div>
        <section id="footer">
          <div className="container">
            <div className="row text-center text-xs-center text-sm-left text-md-left">
              <div className="col-xs-12 col-sm-4 col-md-4">
                <h5>Quick links</h5>
                <ul className="list-unstyled quick-links">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/">About</Link>
                  </li>
                  <li>
                    <Link to="/">FAQs</Link>
                  </li>
                  <li>
                    <Link to="/">Get Started</Link>
                  </li>
                  <li>
                    <Link to="/">Support</Link>
                  </li>
                </ul>
              </div>
              <div className="col-xs-12 col-sm-4 col-md-4">
                <h5>Partners</h5>
                <ul className="list-unstyled quick-links">
                  <li>
                    <Link to="/">Open a Restaurant</Link>
                  </li>
                  <li>
                    <Link to="/">Support</Link>
                  </li>
                  <li>
                    <Link to="/">Enquiries</Link>
                  </li>
                  <li>
                    <Link to="/">How it Works</Link>
                  </li>
                  <li>
                    <Link to="/">FAQs</Link>
                  </li>
                </ul>
              </div>
              <div className="col-xs-12 col-sm-4 col-md-4">
                <h5>Quick links</h5>
                <ul className="list-unstyled quick-links">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/">About</Link>
                  </li>
                  <li>
                    <Link to="/">FAQ</Link>
                  </li>
                  <li>
                    <Link to="/">Get Started</Link>
                  </li>
                  <li>
                    <Link to="/">Imprint</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
                <ul className="list-unstyled list-inline social text-center">
                  <li className="list-inline-item">
                    <Link to="/">
                      <i className="fa fa-facebook" />
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="/">
                      <i className="fa fa-twitter" />
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="/">
                      <i className="fa fa-instagram" />
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="/">
                      <i className="fa fa-google-plus" />
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="/" target="_blank">
                      <i className="fa fa-envelope" />
                    </Link>
                  </li>
                </ul>
              </div>
              <hr />
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
                <p>
                  <u>
                    <Link to="/">No-Cookn</Link>
                  </u>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Numquam voluptatibus eos id aspernatur ad odio.
                </p>
                <p className="h6">
                  &copy All right Reserved.
                  <Link to="/" className="text-green ml-2">
                    No-cookn.com - 2018
                  </Link>
                </p>
              </div>
              <hr />
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default Footer;
