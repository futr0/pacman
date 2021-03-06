import React, {Component} from 'react';
import { ReactComponent as GhostSvg } from './ghost.svg';
import {gameScreenParams, charactersParams} from '../../helpers/config'
import './style.css'

class Ghost extends Component {

    state = {
        direction: 'left',
        position: {
            top: this.props.position.top,
            left: this.props.position.left
        }
    }

    componentDidMount() {
        const changeInterval = 2000;
        this.changeDirectionInterval = setInterval(this.changeDirection, changeInterval);
        this.moveInterval = setInterval(this.move, changeInterval);
    }

    componentWillUnmount() {
        clearInterval(this.changeDirectionInterval);
        clearInterval(this.moveInterval);
    }

    changeDirection = () =>  {
        const arrayOfMovement = ['left', 'up', 'down', 'right'];
        const movement = Math.floor(Math.random() * 4);

        this.setState({direction: arrayOfMovement[movement]}, () => {
        });
    }

    move = () => {
        //TODO: refactor here and in Pacman component to reuse movement code
        const currentTop = this.state.position.top;
        const currentLeft = this.state.position.left;
        const {direction} = this.state;
        const {step, border, size, topScoreBoardHeight} = this.props;

        if(direction === 'up') {
            this.setState({
                position: {
                    top: Math.max(currentTop - step, 0),
                    left: currentLeft
                }
            })
        }
        else if (direction === 'down') {
            this.setState({
                position: {
                    top: Math.min(currentTop + step, window.innerHeight - border - size - topScoreBoardHeight),
                    left: currentLeft
                }
            })
        }
        else if (direction === 'right') {
            this.setState({
                position: {
                    top: currentTop,
                    left: Math.min(currentLeft + step, window.innerWidth - border - size)
                }
            })
        }
        else if (direction === 'left') {
            this.setState({
                position: {
                    top: currentTop,
                    left: Math.max(currentLeft - step, 0)
                }
            })
        }
    }

    render() {
        const {color} = this.props;
        return(
            <div style={this.state.position} className='ghost'>
                <GhostSvg className={`ghost-${color}`}/>
            </div>
        )
    }
}

Ghost.defaultProps = {
    color: 'yellow',
    step: charactersParams().step,
    size: charactersParams().size,
    position: { top: 50 * 3, left: 50 * 3 },
    border: gameScreenParams().border,
    topScoreBoardHeight: gameScreenParams().topScoreBoardHeight
}

export default Ghost;