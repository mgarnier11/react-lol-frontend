import React from 'react';
import { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Dropdown from 'react-dropdown';


// The Header creates links that can be used to navigate
// between routes.
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            summonerName: '',
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
        this.props.onRegionChange(option.value);
    }

    render() {
        return (
            <nav className="headerNavbar navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <Link to='/' className="navbar-brand">Home</Link>

                {this.renderForm("headerForm form-inline d-lg-none")}

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link to='/recentGames' className="nav-item nav-link">Recent Games</Link>
                        <Link to='/championStats' className="nav-item nav-link">Champions Stats</Link>
                    </div>
                </div>

                {this.renderForm("headerForm form-inline d-none d-lg-block")}
            </nav>
        );
    }

    renderForm(className) {
        return (
            <div className={className}>
                <Dropdown className="headerDropdown" controlClassName="form-control" options={this.props.regions} onChange={this.onSelect} value={this.props.region} placeholder="Select an option" />
                <input className="headerText form-control" type="text" value={this.state.summonerName} onChange={this.handleChange} />
                <Link to={(this.state.summonerName ? '/game/' + this.state.summonerName : '')} className="headerBtn form-control btn btn-outline-light">Game</Link>
                <Link to={(this.state.summonerName ? '/summoner/' + this.state.summonerName : '')} className="headerBtn form-control btn btn-outline-light">Summoner</Link>
            </div>
        );
    }
}
export default Header;

