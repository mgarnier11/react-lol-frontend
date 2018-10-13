//lols.gg
import React from 'react';
import { Component } from 'react';
import Switch from "react-switch";

import Team from '../../../classes/Team';

import config from '../../../config.js';

import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import TeamRow from './Row/TeamRow';
import TeamCard from './Card/TeamCard';

import MatchInfos from './MatchInfos';


class Game extends Component {
    constructor(props) {
        super(props);
        var summonerName = this.props.summonerName;
        this.socket = this.props.socket;
        this.state = {
            summonerName: summonerName,
            match: null,
            teams: [],
            error: null,
            cardDesign: false
        }

        this.handleSwitchChange = this.handleSwitchChange.bind(this);


    }

    setStateParticipant(newParticipant) {
        var teams = [...this.state.teams];
        teams.forEach(team => {
            team.updateParticipant(newParticipant);
        });
        this.setState({ teams: teams });
    }

    findParticipantInTeams(participantId) {
        var teams = [...this.state.teams];
        var found;
        teams.forEach(team => {
            var foundParticipant = team.findParticipant(participantId);
            if (foundParticipant) found = foundParticipant;

        });
        if (found != undefined) return found;

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.summonerName) this.setState({ summonerName: nextProps.summonerName, match: null, error: null, teams: [] }, () => this.socket.emit('getSummonerByName', this.state.summonerName));
    }

    componentWillUnmount() {
        this.socket.emit('resetSummoners');
        this.socket.off('returnSummoner');
        this.socket.off('returnActiveMatch');
        this.socket.off('returnMatch');
        this.socket.off('returnTeams');
        this.socket.off('returnParticipant');
        this.socket.off('returnSummonerStats');
        this.socket.off('returnError');
    }

    componentDidMount() {
        this.socket.emit('getSummonerByName', this.state.summonerName);
        this.socket.on('returnSummoner', (summoner) => {
            if (summoner) if (summoner.id) {
                this.socket.emit('getActiveMatch', summoner.id);
            }
        });

        this.socket.on('returnActiveMatch', (match) => {
            if (match.gameId) {
                this.socket.emit('getTeams', match.participants);
                this.setState({ match: match });
            }
        });

        this.socket.on('returnMatch', (match) => {
            if (match.gameId) {
                this.setState({ match: match });
            }
        });

        this.socket.on('returnTeams', (teams) => {
            var newTeams = [];
            teams.forEach(team => {
                newTeams.push(new Team(team.participants, team.queues));
                team.participants.forEach(participant => {
                    this.socket.emit('getParticipant', participant);
                    this.socket.emit('getRanks', participant);
                    this.socket.emit('getSummonerStatsByIdChampionId', { summonerId: participant.summonerId, championId: participant.championId });
                });
            });

            this.setState({ teams: newTeams });
        })

        this.socket.on('returnParticipant', (participant) => {
            if (participant.summonerId) {
                this.setStateParticipant(participant);
            }
        });

        this.socket.on('returnSummonerStats', (summoner) => {
            var participant = this.findParticipantInTeams(summoner.id);

            summoner.champion = participant.champion;
            participant.summoner = summoner;

            this.setStateParticipant(participant);
        });

        this.socket.on('returnError', (error) => {
            this.setState({ match: null, error: error });
        });
    }

    handleSwitchChange(checked) {
        this.setState({ cardDesign: checked });
    }

    render() {
        if (this.state.match) {
            var participants = this.state.match.participants;
            return (
                <div className="activeMatch">
                    {(this.state.cardDesign ? this.renderCardDesign(this.state.teams) : this.renderRowDesign(this.state.teams))}
                    <Switch onChange={this.handleSwitchChange} checked={this.state.cardDesign} id="normal-switch" className="switchButton" />
                    <MatchInfos match={this.state.match} />
                </div>
            );
        } else if (this.state.error) {
            return (<Error error={this.state.error} />);
        } else {
            return <Loading />
        }
    }

    renderCardDesign(teams) {
        return (
            teams.map((team, i) => {
                if (team.queues) var queue = team.queues.find(queue => {
                    return queue.id == this.state.match.gameQueueConfigId;
                })

                return (<TeamCard team={team} teamCardPlace={((i % 2) == 1 ? 'top' : 'bottom')} queueIdDisplayed={(queue ? queue.id : 420)} key={'team' + i} />);
            })
        )
    }

    renderRowDesign(teams) {
        return (
            teams.map((team, i) => {
                if (team.queues) var queue = team.queues.find(queue => {
                    return queue.id == this.state.match.gameQueueConfigId;
                })

                return (<TeamRow team={team} teamRowPlace={((i % 2) == 1 ? 'top' : 'bottom')} queueIdDisplayed={(queue ? queue.id : 420)} key={'team' + i} />);
            })
        )
    }
}
export default Game
