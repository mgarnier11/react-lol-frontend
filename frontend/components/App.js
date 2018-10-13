import React from 'react'
import { Component } from 'react';
import Header from './Header'
import { Route } from 'react-router-dom'
import io from 'socket.io-client';
import Game from './Game/Game'
import RecentGames from './RecentGames/RecentGames';
import ChampionsStats from './ChampionStats/ChampionsStats';
import Champion from './ChampionStats/Champion';

import config from '../../config';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.socket = io('http://localhost:' + config.servers.EUW.port);
        this.socket.server = config.servers.EUW;
        window.server = config.servers.EUW;
    }

    render() {
        return (
            <div className="container">
                <Header />
                <Route path='/game/:summonerName' render={(props) => <Game socket={this.socket} summonerName={props.match.params.summonerName} />} />
                <Route path='/recentGames' render={(props) => <RecentGames socket={this.socket} />} />
                <Route path='/champions/:championKey' render={(props) => <Champion socket={this.socket} championKey={props.match.params.championKey} />} />
                <Route path='/championStats' render={(props) => <ChampionsStats socket={this.socket} />} />
            </div>
        )
    }
}

export default App;