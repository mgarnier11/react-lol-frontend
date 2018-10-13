import React from 'react';
import { Tooltip } from 'react-tippy';
import { Component } from 'react';

import Utils from '../../../Utils/Utils';


class SummonerQueues extends Component {

    constructor(props) {
        super(props);
        this.state = {
            queues: this.props.queues,
            queueIdDisplayed: this.props.queueIdDisplayed
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.queues) this.setState({ queues: nextProps.queues });
        if (nextProps.queueIdDisplayed) this.setState({ queueIdDisplayed: nextProps.queueIdDisplayed });
    }

    render() {
        if (this.state.queues) var queueSelected = this.state.queues.find(queue => {
            return queue.id == this.state.queueIdDisplayed;
        });
        return (
            <div className="summonerQueue">
                {this.renderQueueDivPos("side", this.renderRankImg((queueSelected ? queueSelected.rank : undefined)))}
                {this.renderQueueDivPos("center", this.renderQueueText(queueSelected))}
                {this.renderQueueDivPos("side", this.renderRankWinrate((queueSelected ? queueSelected.rank : undefined)))}
            </div>)
    }

    renderQueueDivPos(position, callback) {
        return (
            <div className={position}>
                {callback}
            </div>
        )
    }

    renderRankImg(rank) {
        return (
            <Tooltip
                className="leaguePoints"
                title="leaguePoints"
                position="bottom"
                html={scoreToolTip(rank)}
                trigger="mouseenter"
                style={{ display: 'block' }}>
                <div className={'rankImg lol-leagues-map lol-league-' + (rank ? rank.tier.toLowerCase() + '-' + rank.rank.toLowerCase() : 'unranked')}>
                    <span>
                        {(rank ? rank.rank : '')}
                    </span>
                </div>
            </Tooltip>
        )

        function scoreToolTip(rank) {
            if (rank) {
                return (
                    <span>Player global score : {rank.score}</span>
                )
            } else {
                return <span>Unranked</span>;
            }
        }
    }


    renderQueueText(queue) {
        if (queue) {
            return (
                <div className="queueText">
                    <div className="leagueName">{(queue.rank ? queue.rank.leagueName : 'Unranked')}</div>
                    <div className="queueName">{queue.named}</div>
                    <Tooltip
                        className="leaguePoints"
                        title="leaguePoints"
                        position="bottom"
                        html={rankTierToolTip(queue)}
                        trigger="mouseenter"
                        style={{ display: 'block' }}>
                        {Utils.renderBar((queue.rank ? queue.rank.leaguePoints : 0))}
                    </Tooltip>
                </div >
            )
        }
        function rankTierToolTip(queue) {
            if (queue.rank) {
                return (
                    <span>{queue.rank.tier + ' ' + queue.rank.rank} <br /> {queue.rank.leaguePoints + ' Points'}</span>
                )
            } else {
                return (<span>Unranked</span>)
            }
        }
    }

    renderRankWinrate(rank) {

        if (rank) {
            return (
                <Tooltip
                    className="leaguePoints"
                    title="leaguePoints"
                    position="bottom"
                    html={rankWinrateToolTip(rank)}
                    trigger="mouseenter"
                    style={{ display: 'block' }}>
                    {Utils.renderCircle(Math.round(rank.wins * 100 / (rank.wins + rank.losses)))}
                </Tooltip>
            )
        }
        function rankWinrateToolTip(rank) {
            if (rank) {
                return (
                    <span>{rank.wins + ' wins / ' + rank.losses + ' losses'}<br />{Math.round(rank.wins * 100 / (rank.wins + rank.losses)) + '% winrate'}</span>
                )

            }
        }
    }
}
export default SummonerQueues
