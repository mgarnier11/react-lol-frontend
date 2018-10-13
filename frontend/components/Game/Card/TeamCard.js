import React from 'react';
import { Component } from 'react';

import SummonerCard from './SummonerCard';

class TeamCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            team: this.props.team,
            teamCardPlace: this.props.teamCardPlace,
            queueIdDisplayed: this.props.queueIdDisplayed
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.team) this.setState({ team: nextProps.team });
    }

    render() {
        return (
            <div className="team">
                {(this.state.teamCardPlace == 'top' ? this.renderTeamRow(this.state.team) : '')}
                {this.renderParticipants(this.state.team.participants)}
                {(this.state.teamCardPlace == 'bottom' ? this.renderTeamRow(this.state.team) : '')}
            </div>
        )
    }

    renderParticipants(participants) {
        if (participants) {
            return (
                <div className={'teamParticipants ' + this.state.teamCardPlace}>
                    {participants.map(participant => {
                        return (<SummonerCard participant={participant} queueIdDisplayed={this.state.queueIdDisplayed} key={'participant' + participant.summonerId} />);
                    })}
                </div>
            )
        }
    }

    renderTeamRow(team) {
        return (
            <div className="teamInfos">

                {this.renderMatchStatsDiv(team)}
                {this.renderQueuesButtons(team.queues)}

            </div>
        )
    }

    renderMatchStatsDiv(team) {
        return (
            <div className="matchStatsDiv">

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
}
export default TeamCard
