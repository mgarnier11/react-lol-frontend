import React from 'react'
import { Component } from 'react';

// The Roster component matches one of two different routes
// depending on the full pathname
class Error extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: this.props.error
        }
    }

    render() {
        return (
            <div className="error">
                {this.treatError(this.state.error)}
            </div>);
    }

    treatError(error) {
        switch (error.code) {
            case 404:
                switch (error.type) {
                    case 'Summoner':
                        return (this.renderSummonerNotFoundError())
                    case 'Match':
                        return (this.renderMatchNotFoundError())
                }
            case 403:
                return (this.renderOutofKeyError())
            default:
                return (this.renderOtherError(error))
        }
    }

    renderSummonerNotFoundError() {
        return (<h1>Error : Summoner Not Found</h1>)
    }

    renderMatchNotFoundError() {
        return (<h1>Error : Summoner is not in game</h1>)
    }

    renderApiError() {
        return (<h1>Api Error</h1>)
    }

    renderOutofKeyError() {
        return (<h1>Regenerate Api Key</h1>)
    }

    renderOtherError(error) {
        console.log(error);
        return (JSON.stringify(error))
    }
}

export default Error
