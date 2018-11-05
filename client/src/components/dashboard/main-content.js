import React, { Component } from 'react';
import Tabs from '../shared/tabs';
import Orders from './orders';
import Favourites from './favourites';

class MainContent extends Component {
  render() {
    return (
      <div>
        <div>
          <Tabs>
            <div label="Orders">
              <Orders />
            </div>
            <div label="Favourites">
              <Favourites />
            </div>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default MainContent;
