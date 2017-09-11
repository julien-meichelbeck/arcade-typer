import Game from 'server/models/game'

const joinGame = (io, socket, { gameId, player }) => {
  socket.join(gameId)
  Game.find(gameId, io)
    .then(game => game.addPlayer(player))
    .catch(e => console.error(e))
}

const leaveGame = (io, socket, { gameId, player }) => {
  socket.leave(gameId)
  Game.find(gameId, io)
    .then(game => game.removePlayer(player))
    .catch(e => console.error(e))
}

const updatePlayer = (io, { gameId, player }) => {
  Game.find(gameId, io)
    .then(game => game.updatePlayer(player))
    .catch(e => console.error(e))
}

export { joinGame, leaveGame, updatePlayer }
