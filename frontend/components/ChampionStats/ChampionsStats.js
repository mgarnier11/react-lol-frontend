import React from 'react';
import { Component } from 'react';
import Champion from './Champion';

class ChampionsStats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            champions: null,
            search: '',
            searchTypes: []
        }
        this.socket = this.props.socket;
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);

    }


    componentDidMount() {
        this.socket.emit('getAllChampions');

        this.socket.on('returnChampions', (champions) => {
            console.log(champions)
            this.setState({ champions: champions });
        });

    }

    handleSearchChange(event) {
        this.setState({
            search: event.target.value
        })
    }

    handleCheckboxChange(event) {
        var searchTypes = [...this.state.searchTypes];
        var value = event.target.getAttribute('value');
        if (event.target.classList.contains('active')) {
            searchTypes.push(value);
        } else {
            var i = searchTypes.indexOf(value);
            if (i > -1) searchTypes.splice(i, 1);
        }
        this.setState({ searchTypes: searchTypes });
    }

    render() {
        return (
            <div className="championStats">
                {this.renderSearch(this.state.search)}
                {this.renderChampions(this.searchChampions(this.state.champions, this.state.search, this.state.searchTypes))}
            </div>
        );
    }

    renderChampions(champions) {
        if (champions) {
            return (<div className="champions">
                {champions.map(champion => {
                    return Champion.renderChampionIcon(champion)
                })}
            </div>)
        }
    }

    renderSearch(txt) {
        return (
            <div className="search form-inline btn-group-toggle" data-toggle="buttons">

                <label className="btn btn-secondary btn-outline-dark" onClick={this.handleCheckboxChange} value="fighter">
                    <input type="checkbox" />Fighter
                </label>
                <label className="btn btn-secondary btn-outline-dark" onClick={this.handleCheckboxChange} value="tank">
                    <input type="checkbox" />Tank
                </label>
                <label className="btn btn-secondary btn-outline-dark" onClick={this.handleCheckboxChange} value="mage">
                    <input type="checkbox" />Mage
                </label>
                <label className="btn btn-secondary btn-outline-dark" onClick={this.handleCheckboxChange} value="assassin">
                    <input type="checkbox" />Assassin
                </label>
                <label className="btn btn-secondary btn-outline-dark" onClick={this.handleCheckboxChange} value="marksman">
                    <input type="checkbox" />Marksman
                </label>
                <label className="btn btn-secondary btn-outline-dark" onClick={this.handleCheckboxChange} value="support">
                    <input type="checkbox" />Support
                </label>

                <input className="form-control searchText" type="text" value={this.state.search} onChange={this.handleSearchChange} />
            </div>
        );
    }

    searchChampions(champions, search, searchTypes) {
        if (champions) {
            return champions.filter(champion => {
                var foundName = champion.name.toLowerCase().includes(search.toLowerCase());
                var foundTypes = true;
                if (searchTypes.length > 0) {
                    foundTypes = false;
                    champion.tags.forEach(tag => {
                        if (searchTypes.includes(tag.toLowerCase())) foundTypes = true;
                    });
                }
                return foundName == true && foundTypes == true
            })
        }
    }
}
export default ChampionsStats
