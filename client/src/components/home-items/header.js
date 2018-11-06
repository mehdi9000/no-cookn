import React, { Component } from 'react';
import SearchForm from './search-form';

class Header extends Component {
  render() {
    return (
      <div>
        <section className="jumbotron header-jumb text-center">
          <div className="container justify-items-center">
            <h2 className="main-header mb-3">Order food now.</h2>
            <h4 className="sub-main-header mb-3">
              Thousands of restaurants at your fingertips
            </h4>
            <h6>Grab a bite from restaurants around you!</h6>

            <SearchForm />
          </div>
        </section>
      </div>
    );
  }
}
export default Header;
