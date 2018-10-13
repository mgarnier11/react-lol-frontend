import React from 'react';
import { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Dropdown from 'react-dropdown';

import config from '../../config';

const regions = [];

Object.keys(config.servers).map(server => {
    regions.push({ value: config.servers[server].region, label: server });
});

// The Header creates links that can be used to navigate
// between routes.
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            summonerName: '',
            region: '',
            redirectSummoner: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSelect = this.onSelect.bind(this)
    }

    handleChange(event) {
        this.setState({
            summonerName: event.target.value
        })
    }

    onSelect(option) {
        this.setState({
            region: option
        })
    }

    render() {
        return (
            <nav className="headerNavbar navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <Link to='/' className="navbar-brand">Home</Link>

                <div className="headerForm form-inline d-lg-none">
                    <input className="headerText form-control" type="text" value={this.state.summonerName} onChange={this.handleChange} />
                    <Link to={(this.state.summonerName ? '/game/' + this.state.summonerName : '')} className="headerBtn form-control btn btn-outline-light">Game</Link>
                    <Link to={(this.state.summonerName ? '/summoner/' + this.state.summonerName : '')} className="headerBtn form-control btn btn-outline-light">Summoner</Link>
                </div>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link to='/recentGames' className="nav-item nav-link">Recent Games</Link>
                        <Link to='/championStats' className="nav-item nav-link">Champions Stats</Link>
                    </div>
                </div>

                <div className="headerForm form-inline d-none d-lg-block">
                    <input className="headerText form-control" type="text" value={this.state.summonerName} onChange={this.handleChange} />
                    <Link to={(this.state.summonerName ? '/game/' + this.state.summonerName : '')} className="headerBtn form-control btn btn-outline-light">Game</Link>
                    <Link to={(this.state.summonerName ? '/summoner/' + this.state.summonerName : '')} className="headerBtn form-control btn btn-outline-light">Summoner</Link>
                </div>
            </nav>
        );
    }
}
export default Header;

