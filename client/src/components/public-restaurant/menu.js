import React, { Component } from 'react';
import Tabs from '../shared/tabs';
import MenuItem from './menu-item';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: ['Bananas', 'Frozen Pizza', "Flamin' Hot Cheetos", 'Arugula']
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
