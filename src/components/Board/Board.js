import React, { Component } from 'react';
import {config, charactersParams} from '../../helpers/config'
import Pacman from '../Pacman';
import Ghost from '../Ghost';
import Food from '../Food';
import './style.css';

class Board extends Component {

  constructor(props) {
    super(props);
    this.pacmanRef = React.createRef();
    this.foods = [];
    this.ghosts = [];
    this.amountOfGhosts = 1;
    this.amountOfFood = this.calculateAmountOfFood();
    this.populateElementArray('food',this.amountOfFood);
    this.populateElementArray('ghost', this.amountOfGhosts);
  }

  componentDidMount() {
    this.intervalFood = setInterval(this.detectFoodCollision, 100);
    this.detectGhostCollision = setInterval(this.detectGhostCollision, 100);
  }

  componentWillUnmount() {
    clearInterval(this.intervalFood);
    clearInterval(this.detectGhostCollision);
  }

  detectFoodCollision = () => {
    this.detectCollision('food');
  }

  detectGhostCollision = () => {
    this.detectCollision('ghost');
  }

  detectCollision = (elementType) => {
    var coords = this.getPacmanCoords();
    var element = elementType.toString();
    var amount = element === 'food'? this.amountOfFood : this.amountOfGhosts;

    for (let i = 0; i <= amount; i++) {
      if(this[`${element}` + i]) {
        const currentElem = this[`${element}` + i].current;
        if (currentElem) {
          const currentElemX = currentElem.state.position.left;
          const currentElemY = currentElem.state.position.top;
          const currentElemSize = element === 'food'? currentElem.props.foodSize :
           currentElem.props.size;
          const currentElemLastX = currentElemX + currentElemSize / 2;
          const currentElemLastY = currentElemY + currentElemSize / 2;
  
          if (
            (coords.pacmanX >= currentElemX && coords.pacmanX <= currentElemLastX)
            || (coords.pacmanLastX >= currentElemX && coords.pacmanLastX <= currentElemLastX)) {
            if ((coords.pacmanY >= currentElemY && coords.pacmanY <= currentElemLastY)
              || (coords.pacmanLastY >= currentElemY && coords.pacmanLastY <= currentElemLastY)) {
                 if (element === 'ghost') {
                    if (!this.pacmanRef.current.state.hidden) {
                      this.pacmanRef.current.wasKilled();
                    }
                  }
                  if (elementType === 'food') {
                    if (!currentElem.state.hidden) {
                      currentElem.wasEaten();
                      this.props.setScore((value) => value + 1)
                    }
                  }
            }
          }
        }
      }
    }
  }

  populateElementArray(type, amount) {
    for (let i = 0; i < amount; i++) {
      this[`${type.toString()}` + i] = React.createRef();
    }
  }

  calculateAmountOfFood() {
    return (
      (window.innerWidth - this.props.foodSize)
      * (window.innerHeight - this.props.topScoreBoardHeight)
    ) / (this.props.foodSize * this.props.foodSize) - 1;
  }

  getPacmanCoords() {
    const pacmanX = this.pacmanRef.current.state.position.left;
    const pacmanY = this.pacmanRef.current.state.position.top;
    const pacmanSize = this.pacmanRef.current.props.size

    const pacmanLastX = pacmanX + pacmanSize / 2;
    const pacmanLastY = pacmanY + pacmanSize / 2;

    return {
      pacmanX,
      pacmanY,
      pacmanLastX,
      pacmanLastY
    };
  }

  render() {
    const { foodSize, border, topScoreBoardHeight } = this.props;
    let foods = [];
    let ghosts = [];
    let currentTop = 0;
    let currentLeft = 1 * foodSize;

    for (let i = 0; i < this.amountOfFood; i++) {
      if (currentLeft + foodSize >= window.innerWidth - border) {
        currentTop += this.props.foodSize;
        currentLeft = 0;
      }

      if (currentTop + foodSize >= (window.innerHeight - border - topScoreBoardHeight )) {
        break;
      }

      const position = { left: currentLeft, top: currentTop };
      currentLeft += foodSize;
      foods.push(
        <Food
          key={`food-elem-${i}`}
          position={position}
          ref={this['food' + i]}
        />
      );
    }

    for (let i = 0; i <this.amountOfGhosts; i++) {
      ghosts.push(
        <Ghost
        key={`ghost-elem-${i}`}
        color='pink'
        ref={this['ghost' + i]}
        />
      )
    }

    return (
      <div className="board">
        {foods}
        {ghosts}
        <Pacman ref={this.pacmanRef} />
      </div>
    )
  }
}

Board.defaultProps = {
  foodSize: charactersParams().size,
  border: config().border,
  topScoreBoardHeight: config().topScoreBoardHeight
}

export default Board;