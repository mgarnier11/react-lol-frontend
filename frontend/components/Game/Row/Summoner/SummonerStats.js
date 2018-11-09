import React from 'react';
import { Component } from 'react';
import { Tooltip } from 'react-tippy';

import Utils from '../../../Utils/Utils';

class SummonerStats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            summoner: this.props.summoner,
            queueDisplayed: this.props.queueDisplayed,
            globalWinRate: undefined,
            globalKda: undefined,
            queueWinRate: undefined,
            queueKda: undefined,
            percent: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.percent) {
            this.setState({ percent: nextProps.percent });
        }

        var queueWinRate, queueKda = undefined;
        var queue = nextProps.queueDisplayed;
        if (queue) {
            if (nextProps.queueDisplayed) {
                if (this.state.summoner) if (this.state.summoner[queue.id]) {
                    queueWinRate = this.state.summoner[queue.id].winRate;
                    queueKda = this.state.summoner[queue.id].kda;
                }
                this.setState({
                    queueDisplayed: queue,
                    queueWinRate: queueWinRate,
                    queueKda: queueKda
                });
            } else queue = this.state.queueDisplayed;

            if (nextProps.summoner) {
                if (nextProps.summoner[queue.id]) {
                    queueWinRate = nextProps.summoner[queue.id].winRate;
                    queueKda = nextProps.summoner[queue.id].kda;
                } else queueWinRate, queueKda = undefined;

                this.setState({
                    summoner: nextProps.summoner,
                    globalWinRate: nextProps.summoner.winRate,
                    globalKda: nextProps.summoner.kda,

                    queueWinRate: queueWinRate,
                    queueKda: queueKda,
                });
            }
        }

    }

    render() {
        var summoner = this.state.summoner;
        var queueDisplayed = this.state.queueDisplayed;

        if (!isNaN(this.state.globalWinRate) && summoner.nbGames > 0) {

            return (
                <div className="summonerStats">
                    {this.renderWinRate(this.state.globalWinRate, this.winRateToolTip(summoner))}
                    <div className="kdas">
                        {this.renderKda(this.state.globalKda, this.kdaToolTip(summoner))}
                        {this.renderKda((this.state.queueKda != this.state.globalKda ? this.state.queueKda : undefined), this.kdaToolTip(summoner, queueDisplayed))}
                    </div>
                    {this.renderWinRate(this.state.queueWinRate, this.winRateToolTip(summoner, queueDisplayed))}
                </div>
            )
        } else {
            return (
                <div className="summonerStats">
                    {Utils.renderBar(this.state.percent)}
                </div>
            )
        }
    }

    winRateToolTip(summoner, queue = undefined) {
        if (queue) {
            return (
                <span>
                    {summoner.name} on {summoner.champion.name} <br />
                    {queue.named}<br />
                    {(summoner[queue.id] ?
                        (summoner[queue.id].matchList ? summoner[queue.id].matchList.length : 0) + ' games ' + Math.round(summoner[queue.id].winRate) + '% wr' :
                        summoner.nbGames + ' games ' + Math.round(summoner.winRate) + '% wr')}
                </span>
            )
        } else {
            return (
                <span>
                    {summoner.name} on {summoner.champion.name} <br />
                    All Queues<br />
                    {summoner.nbGames + ' games ' + Math.round(summoner.winRate) + '% wr'}
                </span>
            )
        }
    }

    kdaToolTip(summoner, queue = undefined) {
        if (queue) {
            if (summoner[queue.id]) {
                if (summoner[queue.id].matchList) {
                    return (
                        <span>
                            {summoner.name} on {summoner.champion.name} <br />
                            {queue.named}<br />
                            {summoner[queue.id].matchList.length + ' games '}{this.advancedKda(summoner[queue.id].kda)}
                        </span>
                    )
                }
            }
        } else {
            return (
                <span>
                    {summoner.name} on {summoner.champion.name} <br />
                    All Queues<br />
                    {(summoner.nbGames + ' games ')}{this.advancedKda(summoner.kda)}
                </span>
            )
        }
    }

    renderWinRate(winRate, toolTip = undefined) {
        if (!isNaN(winRate)) {
            return (
                <Tooltip
                    className="winRate"
                    title="winRate"
                    position="bottom"
                    html={(toolTip ? toolTip : null)}
                    disabled={(toolTip ? false : true)}
                    trigger="mouseenter"
                    style={{ display: 'block' }}>
                    {Utils.renderCircle(Math.round(winRate))}
                </Tooltip>
            );
        }
    }

    renderKda(kda, toolTip = undefined) {
        if (kda) {
            return (
                <Tooltip
                    className="kda"
                    title="kda"
                    position="bottom"
                    html={toolTip}
                    trigger="mouseenter"
                    disabled={(toolTip ? false : true)}
                    style={{ display: 'block' }}>
                    <span style={{ backgroundColor: Utils.kdaColor(this.simpleKda(kda)) }}>
                        {this.simpleKda(kda)}
                    </span>
                </Tooltip>
            )
        }
    }

    simpleKda(kda) {
        var x = kda.split('/').map(function (item) {
            return parseInt(item, 10);
        });
        var kda = ((x[0] + x[2]) / x[1]).toFixed(2);
        if (isNaN(kda)) return 0;
        else return kda;
    }

    advancedKda(kda) {
        var x = kda.split('/').map(function (item) {
            return parseFloat(item);
        });
        return (
            <div>
                <span style={{ color: Utils.killColor(x[0]) }}>{x[0]}</span>/<span style={{ color: Utils.deathColor(x[1]) }}>{x[1]}</span>/<span style={{ color: Utils.killColor(x[2]) }}>{x[2]}</span>
            </div>
        );
    }
}
export default SummonerStats
