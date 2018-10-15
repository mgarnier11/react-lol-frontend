import React from 'react'
import { Component } from 'react';
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

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: 'euw'
        };
        this.socket = io('http://' + this.state.region + '.backend.reactlol.localhost.com', { reconnection: false });
        window.backendUrl = 'http://' + this.state.region + '.backend.reactlol.localhost.com';

        this.onRegionChange = this.onRegionChange.bind(this);
    }

    onRegionChange(region) {
        this.setState({ region: region }, () => {
            this.socket = io('http://' + this.state.region + '.backend.reactlol.localhost.com', { reconnection: false });
            window.backendUrl = 'http://' + this.state.region + '.backend.reactlol.localhost.com';
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

export default App;