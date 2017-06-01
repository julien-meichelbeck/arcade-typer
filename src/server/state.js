import { SET_GAME_STATE, RESET_GAME } from 'shared/actions/games'
import { SET_MESSAGE } from 'shared/actions/global'
import Game from 'server/models/game'
import { rankedPlayers, isProd } from 'shared/utils'

const sendNewGameState = ({ io, game }) => io.to(game.id).emit(SET_GAME_STATE, game)

const joinGame = (io, socket, { gameId, player }) => {
  socket.join(gameId)

  Game.find(gameId).then((game) => {
    game.addPlayer(player)
    sendNewGameState({ io, game: game.toClientData() })
  })
}

const leaveGame = (io, socket, { gameId, player }) => {
  socket.leave(gameId)

  Game.find(gameId).then((game) => {
    game.removePlayer(player)
    sendNewGameState({ io, game: game.toClientData() })
  })
}

const MIN_READY_PLAYERS = isProd ? 2 : 1
const handleNextGameTransition = async (game, io) => {
  const reloadedGame = await game.reload()
  const nextGame = reloadedGame.nextGame()
  nextGame.save()
  io.to(game.id).emit(RESET_GAME)
  // sendNewGameState({ io, game: nextGame.toClientData() })
}
const updatePlayer = (io, { gameId, player }) => {
  Game.find(gameId).then((game) => {
    game.updatePlayer(player)
    if (game.players.filter(({ status }) => status === 'ready').length >= MIN_READY_PLAYERS) {
      const intervalId = setInterval(async () => {
        const reloadedGame = await game.reload()
        if (reloadedGame.countdown < 0) {
          clearInterval(intervalId)
        } else {
          reloadedGame.countdownTick()
          reloadedGame.save()
        }
        sendNewGameState({ io, game: reloadedGame.toClientData() })
      }, 1000)
    }

    if (player.status === 'done') {
      const sortedPlayers = rankedPlayers(game.players)
      const winner = sortedPlayers[0]
      // const loser = sortedPlayers[sortedPlayers.length - 1]
      if (winner.id === player.id) {
        let timeLeft = winner.time * 0.75
        const intervalId = setInterval(() => {
          if (timeLeft < 0) {
            handleNextGameTransition(game, io)
            clearInterval(intervalId)
          } else {
            io.to(game.id).emit(SET_MESSAGE, {
              message: { text: `Next game in ${Math.floor(timeLeft / 1000)} seconds.` },
            })
            timeLeft -= 1000
          }
        }, 1000)
      }
    }
    sendNewGameState({ io, game: game.toClientData() })
  })
}

export { joinGame, leaveGame, updatePlayer }
