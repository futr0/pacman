import React, {Component} from 'react';
import './style.css';

import Pacman from '../Pacman/Pacman';

class Board extends Component {
    render() {
        return (
            <div className="board">
                <div>Hello!</div>
                {/* <Food></Food> */}
                <Pacman></Pacman>
                {/* <Ghost></Ghost> */}
                {/* <Ghost></Ghost> */}
            </div>
        )
    }
}

export default Board;