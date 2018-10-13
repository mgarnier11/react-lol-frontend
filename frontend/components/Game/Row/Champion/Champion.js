import React from 'react';
import { Tooltip } from 'react-tippy';
import { Component } from 'react';

function importAll(r) {
    let datas = {};
    r.keys().map((item, index) => { datas[item.replace('./', '')] = r(item); });
    return datas;
}

const masteriesImages = importAll(require.context('../../../../images/masteries', false, /\.(png|jpe?g|svg)$/));

class Champion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            champion: this.props.champion,
            method: this.props.method
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ champion: nextProps.champion });
    }

    render() {
        switch (this.props.method) {
            case 'ChampionIconMasterie':
                return (this.renderChampionIconMasterie(this.state.champion));
            case 'ChampionIcon':
                return (this.renderChampionIcon(this.state.champion));
            default:
                break;
        }
    }

    renderChampionIconMasterie(champion) {
        return (
            <Tooltip
                className="champion"
                title="champion"
                position="bottom"
                html={championToolTip(champion)}
                trigger="mouseenter">
                {this.renderChampionIcon(champion)}
                {this.renderChampionMasterie(champion)}
            </Tooltip>
        );

        function championToolTip(champion) {
            if (champion) {
                return (<span>{champion.name}<br />{(champion.masterie ? 'Level ' + champion.masterie.championLevel : '')}<br />{(champion.masterie ? champion.masterie.championPoints.toLocaleString(navigator.language) + ' Points' : '')}</span>)
            }
        }
    }

    renderChampionIcon(champion) {
        return (<div className={'icon lol-champion-map lol-champion-' + (champion ? champion.key : '-1')}></div>)
    }

    renderChampionMasterie(champion) {
        if (champion) if (champion.masterie) return (<img src={masteriesImages[champion.masterie.championLevel + '.png']}></img>);
    }
}
export default Champion
