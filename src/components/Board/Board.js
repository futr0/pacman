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
    this.amountOfFood = (
      (window.innerWidth - this.props.foodSize)
      * (window.innerHeight - this.props.topScoreBoardHeight)
    ) / (this.props.foodSize * this.props.foodSize) - 1;

    for (let i = 0; i < this.amountOfFood; i++) {
      this['food' + i] = React.createRef();
    }

    for (let i = 0; i < this.amountOfGhosts; i++) {
      this['ghost' + i] = React.createRef();
    }
  }

  componentDidMount() {
    this.intervalFood = setInterval(this.lookForFood, 100);
    this.detectGhostCollision = setInterval(this.detectGhostCollision, 100);
  }

  componentWillUnmount() {
    clearInterval(this.intervalFood);
    clearInterval(this.detectGhostCollision);
  }

  detectGhostCollision = () => {
    const pacmanX = this.pacmanRef.current.state.position.left;
    const pacmanY = this.pacmanRef.current.state.position.top;
    const pacmanSize = this.pacmanRef.current.props.size

    const pacmanLastX = pacmanX + pacmanSize / 2;
    const pacmanLastY = pacmanY + pacmanSize / 2;

    for (let i = 0; i <= this.amountOfGhosts; i++) {
      if (this['ghost' + i]) {
        const currentGhost = this['ghost' + i].current;
        if (currentGhost) {
          const currentGhostX = currentGhost.state.position.left;
          const currentGhostY = currentGhost.state.position.top;
          const currentGhostSize = currentGhost.props.size;
          const currentGhostLastX = currentGhostX + currentGhostSize / 2;
          const currentGhostLastY = currentGhostY + currentGhostSize / 2;
  
          if (
            (pacmanX >= currentGhostX && pacmanX <= currentGhostLastX)
            || (pacmanLastX >= currentGhostX && pacmanLastX <= currentGhostLastX)) {
            if ((pacmanY >= currentGhostY && pacmanY <= currentGhostLastY)
              || (pacmanLastY >= currentGhostY && pacmanLastY <= currentGhostLastY)) {
              if (!this.pacmanRef.current.state.hidden) {
                this.pacmanRef.current.wasKilled(); // !hidden
              }
            }
          }
        }

      }
    }
  }

  lookForFood = () => {
    const pacmanX = this.pacmanRef.current.state.position.left;
    const pacmanY = this.pacmanRef.current.state.position.top;
    const pacmanSize = this.pacmanRef.current.props.size

    const pacmanLastX = pacmanX + pacmanSize / 2;
    const pacmanLastY = pacmanY + pacmanSize / 2;

    for (let i = 0; i <= this.amountOfFood; i++) {
      const currentFood = this['food' + i].current;
      if (currentFood) {
        const currentFoodX = currentFood.state.position.left;
        const currentFoodY = currentFood.state.position.top;
        const currentFoodSize = currentFood.props.foodSize;
        const currentFoodLastX = currentFoodX + currentFoodSize / 2;
        const currentFoodLastY = currentFoodY + currentFoodSize / 2;

        if (
          (pacmanX >= currentFoodX && pacmanX <= currentFoodLastX)
          || (pacmanLastX >= currentFoodX && pacmanLastX <= currentFoodLastX)) {
          if ((pacmanY >= currentFoodY && pacmanY <= currentFoodLastY)
            || (pacmanLastY >= currentFoodY && pacmanLastY <= currentFoodLastY)) {
            if (!currentFood.state.hidden) {
              currentFood.wasEaten(); // !hidden
              // this.props.increase(); // increase score
              this.props.setScore((value) => value + 1)
            }
          }
        }
      }
    }
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