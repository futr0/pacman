import React, {Component} from 'react';
import './style.css';

import Pacman from '../Pacman/Pacman';
import Ghost from '../Ghost/Ghost';
import Food from '../Food/Food';

class Board extends Component {
    render() {
        return (
            <div className="board">
                <Food position={{top: 10, left: 40}}/>
                <Pacman/>
                {/* <Ghost color="red"/>
                <Ghost color="pink"/>
                <Ghost color="yellow/"/> */}
                <Ghost color="blue"/>
            </div>
        )
    }
}

export default Board;