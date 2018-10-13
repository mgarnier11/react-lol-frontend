import React from 'react';
import { Component } from 'react';

import SummonerRow from './SummonerRow';

class TeamRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            team: this.props.team,
            teamRowPlace: this.props.teamRowPlace,
            queueIdDisplayed: this.props.queueIdDisplayed
        }

        this.queueButtonClick = this.queueButtonClick.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.team) this.setState({ team: nextProps.team });
    }

    queueButtonClick(e) {
        this.state.team.calcPoints();
        this.setState({ queueIdDisplayed: parseInt(e.target.getAttribute('id')) })
    }

    render() {
        return (
            <div className="team">
                {(this.state.teamRowPlace == 'top' ? this.renderTeamRow(this.state.team) : '')}
                {this.renderParticipants(this.state.team.participants)}
                {(this.state.teamRowPlace == 'bottom' ? this.renderTeamRow(this.state.team) : '')}
            </div>
        )
    }

    renderParticipants(participants) {
        if (participants) {
            return (
                <div className={'teamParticipants ' + this.state.teamRowPlace} style={{ height: participants.length * 80 }}>
                    {participants.map(participant => {
                        return (<SummonerRow participant={participant} queueIdDisplayed={this.state.queueIdDisplayed} key={'participant' + participant.summonerId} />);
                    })}
                </div>
            )
        }
    }

    renderTeamRow(team) {
        return (
            <div className="teamInfos">
                {this.renderQueuesButtons(team.queues)}
                {this.renderScore(team.calcPoints())}

            </div>
        )
    }

    renderScore(points) {
        return (
            <div className="matchStatsDiv">
                {points}
            </div>
        );
    }

    renderTeamStatsDiv(team) {
        return (
            <div className="teamStatsDiv">
                {this.renderKda(team.kda())}
                {this.renderWinRate(team.winRate())}
            </div>
        );
    }

    renderQueuesButtons(queues) {
        if (queues) {

            return (
                <div className="queuesButtons">
                    {queues.map(queue => {
                        return (this.renderQueueButton(queue))
                    })}
                </div>
            )
        }
    }

    renderQueueButton(queue) {
        return (
            <button onClick={this.queueButtonClick} id={queue.id} disabled={(this.state.queueIdDisplayed == queue.id ? true : false)} key={'queueButton' + queue.id}>{(queue ? queue.named : '')}</button>
        )
    }

    renderKda(kda) {
        if (kda) return (<div className="col-md-8">{kda}</div>)
    }

    renderWinRate(winRate) {
        if (winRate != undefined) return (<div className="col-md-3">{winRate} %</div>)
    }
}
export default TeamRow
