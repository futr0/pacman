import React, { Component } from 'react';
import {charactersParams} from '../../helpers/config'

import './style.css';

class Food extends Component {
  state = {
    position: {
      top: this.props.position.top,
      left: this.props.position.left
    },
    hidden: false
  }

  wasEaten() {
    this.setState({ hidden: !this.hidden });
  }

  render() {
    const { position, hidden } = this.state;
    return (
      <div style={position} className={hidden ? 'food hidden' : 'food'}>
        <div className="food-dot"></div>
      </div>
    );
  }
}

Food.defaultProps = {
  foodSize: charactersParams().size,
  position: { top: 0, left: 0 }
}

export default Food;