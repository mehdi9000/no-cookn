import React, { Component } from 'react';
import SearchForm from './search-form';

class Header extends Component {
  render() {
    return (
      <div>
        <section className="jumbotron header-jumb text-center">
          <div className="container justify-items-center">
            <p className="lead">We deliver more than just food</p>
            <h1 className="jumbotron-heading">
              We deliver <span>happiness</span>.
            </h1>

            <SearchForm />
          </div>
        </section>
      </div>
    );
  }
}
export default Header;
