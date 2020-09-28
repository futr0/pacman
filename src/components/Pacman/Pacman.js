import React, {Component} from 'react';
import { ReactComponent as PacmanSvg } from './pacman.svg';
import {config, charactersParams} from '../../helpers/config'
import './style.css';

class Pacman extends Component {

    state = {
        direction: 'down',
        position: {
            top: 0,
            left: 0
        }
    }

    constructor(props) {
        super(props);
        this.pacmanRef = React.createRef();
    }

    componentDidMount() {
        this.pacmanRef.current.focus();
    }

    handleKeyDown = (event) => {
        const currentTop = this.state.position.top;
        const currentLeft = this.state.position.left;
        const {step, border, size, topScoreBoardHeight} = this.props;

        if(event.key === 'ArrowUp') {
            this.setState({
                position: {
                    top: Math.max(currentTop - step, 0),
                    left: currentLeft
                },
                direction: 'up'
            })
        }
        else if (event.key === 'ArrowDown') {
            this.setState({
                position: {
                    top: Math.min(currentTop + step, window.innerHeight - border - size - topScoreBoardHeight),
                    left: currentLeft
                },
                direction: 'down'
            })
        }
        else if (event.key === 'ArrowRight') {
            this.setState({
                position: {
                    top: currentTop,
                    left: Math.min(currentLeft + step, window.innerWidth - border - size)
                },
                direction: 'right'
            })
        }
        else if (event.key === 'ArrowLeft') {
            this.setState({
                position: {
                    top: currentTop,
                    left: Math.max(currentLeft - step, 0)
                },
                direction: 'left'
            })
        }
    } 

    render() {

        const {direction, position} = this.state;

        return( 
            <div
            ref={this.pacmanRef} 
            className={`pacman pacman-${direction}`}
            tabIndex="0"
            onKeyDown={this.handleKeyDown}
            style={position}
            >
                <PacmanSvg/>
            </div>
        );
    }
}

Pacman.defaultProps = {
    step: charactersParams().step,
    size: charactersParams().size,
    border: config().border,
    topScoreBoardHeight: config().topScoreBoardHeight
}

export default Pacman;