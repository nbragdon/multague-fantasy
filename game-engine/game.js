class Game extends GameObject {
    constructor() {
        super()
        this.round = 0;
        this.players = [];
    }

    addPlayers(players) {
        this.players = this.players.concat(players);
    }

    getState() {
        return {
            gameId: this.id,
            round: this.round,
            players: this.players.map(player => player.getState())
        }
    }
}