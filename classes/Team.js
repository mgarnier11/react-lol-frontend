var Lodash = require("lodash");

function Team(participants = [], queues = undefined) {
    this.participants = participants;
    this.teamKills = 0;
    this.teamDeaths = 0;
    this.teamAssists = 0;
    this.teamWinRate = 0;
    this.teamKda = '';
    this.queues = queues;
    this.points = 0;



    this.addParticipant = (participant) => {
        this.participants.push(participant);
    }

    this.updateParticipant = (newParticipant) => {
        this.participants.forEach((participant, i) => {
            if (participant.summonerId === newParticipant.summonerId) {
                this.participants[i] = Lodash.merge(newParticipant, participant);
            }
        });
    }

    this.kda = () => {
        var teamKills = [];
        var teamDeaths = [];
        var teamAssists = [];

        this.participants.forEach(participant => {
            if (participant.summoner) {
                var kda = participant.summoner.kda.split('/');
                if (!isNaN(kda[0])) teamKills.push(parseFloat(kda[0]));
                if (!isNaN(kda[1])) teamDeaths.push(parseFloat(kda[1]));
                if (!isNaN(kda[2])) teamAssists.push(parseFloat(kda[2]));
            }
        });

        if (teamKills.length && teamDeaths.length && teamAssists.length) {
            this.teamKills = this.arrayAvg(teamKills);
            this.teamDeaths = this.arrayAvg(teamDeaths);
            this.teamAssists = this.arrayAvg(teamAssists);
            this.teamKda = this.teamKills.toFixed(2) + ' / ' + this.teamDeaths.toFixed(2) + ' / ' + this.teamAssists.toFixed(2);
        }

        return this.teamKda;
    }

    this.winRate = () => {
        var teamWinRate = [];

        this.participants.forEach(participant => {
            if (participant.summoner) {
                if (participant.summoner.winRate) teamWinRate.push(parseFloat(participant.summoner.winRate));
            }
        })

        if (teamWinRate.length) this.teamWinRate = this.arrayAvg(teamWinRate);

        return this.teamWinRate.toFixed(2);
    }

    this.arrayAvg = (arr) => {
        if (arr.length) {
            var sum = arr.reduce((a, b) => { return a + b; });
            return sum / arr.length;
        }
    }

    this.findParticipant = (participantId) => {
        var participant = this.participants.find(participant => {
            return participantId == participant.summonerId
        });
        return participant;
    }

    this.calcPoints = () => {
        var points = [];
        this.participants.forEach(participant => {
            if (participant.queues) {
                var yoloQueue = participant.queues.find(queue => {
                    return queue.id == 420;
                });

                var rank = yoloQueue.rank;

                if (rank) {
                    points.push(rank.score);
                }
            }
        });

        if (points.length > 0) {
            var total = points.reduce((a, b) => { return a + b });
            this.points = parseInt(total / points.length);
        }
        return this.points;

    }
}
module.exports = Team;