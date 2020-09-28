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
    this.foodElementName = 'food';
    this.ghostElementName = 'ghost';
    this.foods = [];
    this.ghosts = [];
    this.amountOfGhosts = 1;
    this.amountOfFood = this.calculateAmountOfFood();
    this.populateElementArray(this.foodElementName,this.amountOfFood);
    this.populateElementArray(this.ghostElementName, this.amountOfGhosts);
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
    this.detectCollision(this.foodElementName);
  }

  detectGhostCollision = () => {
    this.detectCollision(this.ghostElementName);
  }

  detectCollision = (elementType) => {
    var pacmanRef = this.pacmanRef.current;
    var pacmanCoords = this.getElementCoords('', pacmanRef);
    var element = elementType.toString();
    var amount = element === this.foodElementName? this.amountOfFood : this.amountOfGhosts;

    for (let i = 0; i <= amount; i++) {
      if(this[`${element}` + i]) {
        const currentElem = this[`${element}` + i].current;
        if (currentElem) {
          var elementCoords = this.getElementCoords(element, currentElem)
          if (
            (pacmanCoords.elementX >= elementCoords.elementX && pacmanCoords.elementX <= elementCoords.elementLastX)
            || (pacmanCoords.elementLastX >= elementCoords.elementX && element.pacmanLastX <= elementCoords.elementLastX)) {
            if ((pacmanCoords.elementY >= elementCoords.elementY && pacmanCoords.elementY <= elementCoords.elementLastY)
              || (pacmanCoords.elementLastY >= elementCoords.elementY && pacmanCoords.elementLastY <= elementCoords.elementLastY)) {
                if (element === this.ghostElementName) {
                    if (!pacmanRef.state.hidden) {
                      this.pacmanRef.current.wasKilled();
                    }
                  }
                  else {
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

  getElementCoords(name, elementRef) {
    var element = name.toString();
    const elementX = elementRef.state.position.left;
    const elementY = elementRef.state.position.top;
    const elementSize = element === this.foodElementName? elementRef.props.foodSize :
    elementRef.props.size;
    const elementLastX = elementX + elementSize / 2;
    const elementLastY = elementY + elementSize / 2;

    return {
      elementX,
      elementY,
      elementLastX,
      elementLastY
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
          ref={this[this.foodElementName + i]}
        />
      );
    }

    for (let i = 0; i <this.amountOfGhosts; i++) {
      ghosts.push(
        <Ghost
        key={`ghost-elem-${i}`}
        color='pink'
        ref={this[this.ghostElementName + i]}
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