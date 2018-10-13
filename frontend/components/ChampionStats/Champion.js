import React from 'react';
import { Link } from 'react-router-dom';
import { Component } from 'react';

class Champion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            championKey: this.props.championKey,
            champion: null
        }
        this.socket = this.props.socket;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.champion) this.setState({ champion: nextProps.champion });
    }

    componentDidMount() {
        this.socket.emit('getChampionByName', this.state.championKey);

        this.socket.on('returnChampion', (champion) => {
            this.setState({ champion: champion });
        })

    }

    render() {
        return (
            <div>

            </div>
        );
    }

    static renderChampionIcon(champion) {
        return (
            <div className="championIcon">
                <Link to={'/champions/' + champion.id}>
                    <img src={'http://localhost:' + window.server.port + champion.icon}>
                    </img>
                </Link>
                {champion.name}
            </div>
        )
    }
}
export default Champion
