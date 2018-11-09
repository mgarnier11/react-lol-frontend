import React from 'react';
import { Component } from 'react';

import Champion from './Champion/Champion';
import Perks from './Perks/Perks';
import SummonerBasicInfos from './Summoner/SummonerBasicInfos';
import SummonerQueues from './Summoner/SummonerQueues';
import SummonerStats from './Summoner/SummonerStats';

class SummonerRow extends Component {

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
            <div className={'team' + this.state.participant.teamId + ' summonerRow'} style={this.props.style}>
                <div className="championDiv">
                    <Champion champion={this.state.participant.champion} method={'ChampionIconMasterie'} />
                </div>
                <div className="perksDiv">
                    <Perks perks={this.state.participant.perks} />
                </div>
                <div className="summonerInfosDiv">
                    <SummonerBasicInfos participant={this.state.participant} />
                </div>
                <div className="summonerQueuesDiv">
                    <SummonerQueues queues={this.state.participant.queues} queueIdDisplayed={this.state.queueIdDisplayed} />
                </div>
                <div className="summonerStatsDiv">
                    <SummonerStats summoner={this.state.participant.summoner} queueDisplayed={this.state.queueDisplayed} percent={this.state.participant.loading} />
                </div>
            </div >
        )
    }
}
export default SummonerRow
