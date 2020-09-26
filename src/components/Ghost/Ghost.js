import React, {Component} from 'react';
import { ReactComponent as GhostSvg } from './ghost.svg';
import './style.css'

class Ghost extends Component {


    state = {
        direction: 'left',
        position: {
            top: 50 * 3,
            left: 50 * 3
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
    step: 50,
    size: 50, //ghost size 50x50 px
    // TODO: move to config
    border: 10 * 2, //2 * border from Border css
    topScoreBoardHeight: 50
}

export default Ghost;