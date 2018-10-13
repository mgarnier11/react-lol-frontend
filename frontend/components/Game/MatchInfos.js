import React from 'react';
import { Tooltip } from 'react-tippy';
import { Component } from 'react';

class MatchInfos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            match: this.props.match,
            gameTime: 0
        }
        this.startDate = 0;
        this.tick = this.tick.bind(this);


    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match) {
            this.startDate = new Date(nextProps.match.gameStartTime);
            this.setState({ match: nextProps.match });
        }

    }

    componentDidMount() {
        this.timer = setInterval(this.tick, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick() {
        this.setState({ gameTime: new Date() - this.startDate });
    }

    render() {
        return (
            <div className="matchInfos">
                <span>{(this.state.match.map ? this.state.match.map.name : '')}</span>
                <span>{(this.state.match.queue ? this.state.match.queue.name : '')}</span>
                <span className="gameTime">{this.renderGameTime(this.state.gameTime)}</span>
            </div>
        )
    }

    formatSeconds(seconds) {
        function z(n) { return (n < 10 ? '0' : '') + n; }
        return z(seconds / 3600 | 0) + ':' + z((seconds % 3600) / 60 | 0) + ':' + z((seconds % 60) | 0);
    }

    renderGameTime(gameTime) {
        var elapsed = Math.round(gameTime / 100);

        // This will give a number with one digit after the decimal dot (xx.x):
        var seconds = (elapsed / 10).toFixed(1);

        // Although we return an entire <p> element, react will smartly update
        // only the changed parts, which contain the seconds variable.

        return this.formatSeconds(seconds);
    }
}
export default MatchInfos

