import { NEXT_GAME_COUNTDOWN } from 'shared/statuses'
import Game from 'server/models/game'

export const startCountdown = (gameId, io) => {
  const intervalId = setInterval(() => {
    Game.find(gameId, io).then(game => {
      const countdown = (game.state.countdown || 4) - 1
      game.setState({ countdown })
      if (countdown === 0) clearInterval(intervalId)
    })
  }, 1000)
}

export const startNextGameCountdown = (gameId, io) => {
  const intervalId = setInterval(() => {
    Game.find(gameId, io).then(game => {
      if (game.status !== NEXT_GAME_COUNTDOWN) return
      const nextGameCountdown = (game.state.nextGameCountdown || 20) - 1
      if (nextGameCountdown !== 0) {
        game.setState({ nextGameCountdown })
      } else {
        clearInterval(intervalId)
        game.reset()
      }
    })
  }, 1000)

  setTimeout(() => {
    Game.find(gameId, io).then(game => game.reset())
  }, 3000)
}
