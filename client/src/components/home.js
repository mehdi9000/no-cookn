import React, { Component } from 'react';

import MainNav from './shared/main-nav';
import Footer from './shared/footer';
import Header from './home-items/header';
import TopRestaurants from './home-items/top-restaurants';

class Home extends Component {
  render() {
    return (
      <div>
        <MainNav />

        <main role="main">
          <Header />
          <TopRestaurants />
          <Footer />
        </main>
      </div>
    );
  }
}
export default Home;
