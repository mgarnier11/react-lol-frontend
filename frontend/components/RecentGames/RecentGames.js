//lols.gg
import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';

import MatchInfos from '../Game/MatchInfos';

class RecentGames extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matchList: null
        }
        this.socket = this.props.socket;
    }

    componentDidMount() {
        this.socket.emit('getRecentGames');

        this.socket.on('returnRecentGames', (matchList) => {
            this.setState({ matchList: matchList });
        });

        this.socket.on('returnMatch', (newMatch) => {
            var matchList = [...this.state.matchList];
            matchList.forEach((match, i) => {
                if (newMatch.gameId == match.gameId) matchList[i] = newMatch;
            });
            this.setState({ matchList: matchList });
        })

    }

    componentWillUnmount() {
        this.socket.off('returnRecentGames');
        this.socket.off('returnMatch');
    }

    render() {
        return (
            <div className="recentMatches">
                {this.renderMatches(this.state.matchList)}
            </div>
        );
    }

    renderMatches(matches) {
        console.log(matches);
        if (matches) {
            return (matches.map(match => { return this.renderMatch(match) }))
        }
    }

    renderMatch(match) {

        return (
            <div className="recentMatch">
                {this.renderParticipants(match.participants)}

                <Link to={'/game/' + match.participants[0].summonerName}>
                    <MatchInfos match={match} />
                </Link>
                <hr />
            </div>

        )
    }

    renderParticipants(participants) {
        if (participants) {
            var nbParticipants = participants.length;
            return participants.map((participant, i) => {
                return this.renderParticipant(participant)
            })
        }
    }

    renderParticipant(participant) {
        return (
            <div className="summoner">
                <div className={'icon lol-champion-map lol-champion-' + participant.championId}></div>
                <div className="summonerName">{participant.summonerName}</div>

            </div>
        )
    }
}
export default RecentGames
