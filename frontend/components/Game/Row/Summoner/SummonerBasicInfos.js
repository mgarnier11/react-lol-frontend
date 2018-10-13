import React from 'react';
import { Tooltip } from 'react-tippy';
import { Component } from 'react';

import Champion from '../Champion/Champion';

class SummonerBasicInfos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            participant: this.props.participant
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ participant: nextProps.participant });
    }

    render() {
        return (
            <div className="summonerBasicInfos">
                {this.renderSummonerName(this.state.participant)}
                {this.renderSummonerChampions(this.state.participant)}
            </div>)
    }

    renderSummonerIcon(participant) {
        if (participant) if (participant.profileIconId) return (<img src={'http://localhost:' + window.server.port + '/summoners/icons/' + participant.profileIconId + '.jpg'}></img>);
    }

    renderSummonerName(participant) {
        return (
            <Tooltip
                className="summonerName"
                title="summonerLevel"
                position="bottom" z
                html={summonerLevelToolTip(participant.summoner)}
                trigger="mouseenter"
                disabled={(participant.summoner ? false : true)}
                style={{ display: 'block' }}>
                {this.renderSummonerIcon(participant)}
                <span>
                    {(participant ? participant.summonerName : '')}
                </span>
            </Tooltip>
        );

        function summonerLevelToolTip(summoner) {
            if (summoner) {
                return (<span>Level : {summoner.summonerLevel}</span>)
            }
        }
    }

    renderSummonerChampions(participant) {
        return (
            <div className="champions">
                {this.renderBestChampions((participant ? participant.bestChampions : undefined), (participant ? (participant.champion ? participant.champion.key : undefined) : undefined))}
                {this.renderBannedChampion((participant ? participant.bannedChampion : undefined))}
            </div>
        );
    }

    renderBannedChampion(bannedChampion) {
        if (bannedChampion) {
            return (
                <Tooltip
                    className="bannedChampion"
                    title="bannedChampion"
                    position="bottom"
                    html={bannedChampionToolTip(bannedChampion)}
                    trigger="mouseenter">
                    <Champion champion={bannedChampion} method={'ChampionIcon'} />
                </Tooltip>
            );
        }
        function bannedChampionToolTip(champion) {
            if (champion.name) {
                return 'Banned : ' + champion.name;
            } else {
                return 'Banned : none';
            }
        }

    }

    renderBestChampions(champions, participantChampionId) {
        if (champions) {
            return (
                <div className="bestChampions">
                    {champions.map((champion, i) => {
                        if (i < 4) return (
                            <Tooltip
                                key={'bestChampion' + champion.id}
                                className={'bestChampion' + (participantChampionId == champion.key ? ' actualChampion' : '')}
                                title="bestChampion"
                                position="bottom"
                                html={bestChampionToolTip(champion)}
                                trigger="mouseenter">
                                <Champion champion={champion} method={'ChampionIcon'} />
                            </Tooltip>
                        );
                    })}
                </div>

            )
        }
        function bestChampionToolTip(champion) {
            if (champion) {
                return (<span>{champion.name}<br />{(champion.masterie ? 'Level ' + champion.masterie.championLevel : '')}<br />{(champion.masterie ? champion.masterie.championPoints.toLocaleString(navigator.language) + ' Points' : '')}</span>)
            }
        }
    }
}
export default SummonerBasicInfos
