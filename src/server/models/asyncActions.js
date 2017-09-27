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

const NEXT_GAME_COUNTDOWN_TIME = 30
export const startNextGameCountdown = (gameId, io) => {
  const intervalId = setInterval(() => {
    Game.find(gameId, io)
      .then(game => {
        const { status, nextGameCountdown } = game.state
        if (status !== NEXT_GAME_COUNTDOWN) return
        const nextGameCountdownValue = (nextGameCountdown || NEXT_GAME_COUNTDOWN_TIME) - 1
        if (nextGameCountdownValue !== 0) {
          game.setState({ nextGameCountdown: nextGameCountdownValue })
        } else {
          clearInterval(intervalId)
          game.reset()
        }
      })
      .catch(() => clearInterval(intervalId))
  }, 1000)
}
