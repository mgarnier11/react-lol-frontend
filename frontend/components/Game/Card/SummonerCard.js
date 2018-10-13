import React from 'react';
import { Component } from 'react';

class SummonerCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            participant: this.props.participant,
            queueIdDisplayed: this.props.queueIdDisplayed,
            queueDisplayed: null
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.participant) this.setState({ participant: nextProps.participant });
        if (nextProps.queueIdDisplayed) {
            if (this.state.participant.queues) var queueDisplayed = this.state.participant.queues.find(queue => {
                return queue.id == nextProps.queueIdDisplayed;
            });
            this.setState({
                queueIdDisplayed: nextProps.queueIdDisplayed,
                queueDisplayed: queueDisplayed
            });
        }
    }

    render() {
        return (
            <div className={'team' + this.state.participant.teamId + ' summonerCard'}>

            </div >
        )
    }
}
export default SummonerCard
