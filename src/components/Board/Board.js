import React, {Component} from 'react';
import './style.css';

import Pacman from '../Pacman/Pacman';
import Ghost from '../Ghost/Ghost';

class Board extends Component {
    render() {
        return (
            <div className="board">
                {/* <Food></Food> */}
                <Pacman/>
                <Ghost color="red"/>
                <Ghost color="pink"/>
                <Ghost color="blue"/>
                <Ghost color="yellow/"/>
                {/* <Ghost></Ghost> */}
            </div>
        )
    }
}

export default Board;