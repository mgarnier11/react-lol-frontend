import React from 'react'
import { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

import Header from './Header'
import { Route } from 'react-router-dom'
import io from 'socket.io-client';
import Game from './Game/Game'
import RecentGames from './RecentGames/RecentGames';
import ChampionsStats from './ChampionStats/ChampionsStats';
import Champion from './ChampionStats/Champion';

const regions = [
    'euw',
    'eune',
    'tr',
    'ru',
    'na',
    'br',
    'lan',
    'las',
    'kr',
    'jp',
    'oce'
]

var herokuBackend = 'https://react-lol-backend.herokuapp.com';

class App extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);

        const { cookies } = props;

        this.state = {
            region: cookies.get('region') || 'euw'
        };
        this.socket = io(herokuBackend, { reconnection: false });
        window.backendUrl = herokuBackend;

        this.onRegionChange = this.onRegionChange.bind(this);
    }

    onRegionChange(region) {
        const { cookies } = this.props;

        cookies.set('region', region, { path: '/' });

        this.setState({ region: region }, () => {
            this.socket = io(herokuBackend, { reconnection: false });
            window.backendUrl = herokuBackend;
        });

    }

    render() {
        return (
            <div className="container">
                <Header onRegionChange={this.onRegionChange} regions={regions} region={this.state.region} />
                <Route path='/game/:summonerName' render={(props) => <Game socket={this.socket} summonerName={props.match.params.summonerName} />} />
                <Route path='/recentGames' render={(props) => <RecentGames socket={this.socket} />} />
                <Route path='/champions/:championKey' render={(props) => <Champion socket={this.socket} championKey={props.match.params.championKey} />} />
                <Route path='/championStats' render={(props) => <ChampionsStats socket={this.socket} />} />
            </div>
        )
    }
}

export default withCookies(App);