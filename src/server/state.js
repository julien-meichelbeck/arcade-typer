import { SET_GAME_STATE } from 'shared/actions/games'
import Game from 'server/models/game'
import { rankedPlayers, isProd } from 'shared/utils'

const sendNewGameState = ({ io, game }) => io.to(game.id).emit(SET_GAME_STATE, game)

const joinGame = (io, socket, { gameId, player }) => {
  socket.join(gameId)

  Game.find(gameId, game => {
    game.addPlayer(player)
    sendNewGameState({ io, game: game.toClientData() })
  })
}

const leaveGame = (io, socket, { gameId, player }) => {
  socket.leave(gameId)
  Game.find(gameId, game => {
    game.removePlayer(player)
    sendNewGameState({ io, game: game.toClientData() })
  })
}

const MIN_READY_PLAYERS = isProd ? 2 : 1
const updatePlayer = (io, { gameId, player }) => {
  Game.find(gameId, game => {
    game.updatePlayer(player)
    if (game.players.filter(({ status }) => status === 'ready').length >= MIN_READY_PLAYERS) {
      game.start()
    }

    if (player.status === 'done') {
      const winner = rankedPlayers(game.players)[0]
      if (winner.id === player.id) {
        const nextGame = game.nextGame()
        game.calculateNextGameTime(winner)

        setTimeout(() => {
          nextGame.save()
        }, winner.time / 3)
      }
    }
    sendNewGameState({ io, game: game.toClientData() })
  })
}

export { joinGame, leaveGame, updatePlayer }
