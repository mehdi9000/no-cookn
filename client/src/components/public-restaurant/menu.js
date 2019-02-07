import React, { Component } from 'react';
import Tabs from '../shared/tabs';
import MenuItem from './menu-item';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [
        { id: '1', name: 'Bananas', price: 200 },
        { id: '2', name: 'Frozen Pizza', price: 1500 },
        { id: '3', name: "Flamin' Hot Cheetos", price: 300 },
        { id: '4', name: 'Arugula', price: 250 }
      ]
    };
  }
  render() {
    const items = this.state.menu.map((item, id) => (
      <MenuItem menuItem={item} key={id} />
    ));
    return (
      <div>
        <Tabs>
          <div label="Mains">{items}</div>
          <div label="Side">Sides go here</div>
          <div label="Drinks">Drinks</div>
        </Tabs>
      </div>
    );
  }
}
export default Menu;
