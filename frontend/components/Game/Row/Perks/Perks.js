import React from 'react';
import { Tooltip } from 'react-tippy';
import { Component } from 'react';

class Perks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            perks: this.props.perks
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ perks: nextProps.perks });
    }

    render() {
        return (
            <div className="perks">
                {this.renderRunes(this.state.perks)}
                {this.renderSummonerSpells(this.state.perks.spells)}
            </div>)
    }

    renderRunes(perks) {

        return (
            <div className="summonerPerks">
                <Tooltip
                    className="icon"
                    title="rune"
                    position="right"
                    html={runeToolTip(perks.majorRune)}
                    trigger="mouseenter"
                    style={{ display: 'block' }}><div className={'lol-summoner-perk-map lol-summoner-perk-' + (perks ? perks.perkIds[0] : '-1')} ></div>
                </Tooltip>

                <div className={'lol-summoner-perk-style-map lol-summoner-perk-style-' + (perks ? perks.perkSubStyle : '-1')} ></div>
            </div>
        )
        function runeToolTip(rune) {
            if (rune) {
                return (<span>{rune.name}<br />{rune.shortDesc}</span>)
            }
        }
    }

    renderSummonerSpells(spells) {
        if (spells) {

            return (
                <div className="summonerPerks">
                    {spells.map((spell, i) => {
                        return (this.renderSummonerSpellIcon(spell));
                    })}
                </div>
            )

        }
    }

    renderSummonerSpellIcon(summonerSpell) {
        return (
            <Tooltip
                key={'spell' + summonerSpell.id}
                className="icon"
                title="summonerSpell"
                position="right"
                html={summonerSpellToolTip(summonerSpell)}
                trigger="mouseenter"
                style={{ display: 'block' }}>
                <div className={'lol-summoner-spell-map lol-summoner-spell-' + (summonerSpell ? summonerSpell.id : '36')}></div>
            </Tooltip>
        )

        function summonerSpellToolTip(summonerSpell) {
            if (summonerSpell) {
                return (<span>{summonerSpell.name}<br />{summonerSpell.description}</span>)
            }
        }
    }
}
export default Perks
