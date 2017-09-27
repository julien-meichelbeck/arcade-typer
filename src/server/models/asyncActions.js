import { NEXT_GAME_COUNTDOWN } from 'shared/statuses'
import Game from 'server/models/game'
import History from 'server/models/History'
import { isProd } from 'shared/utils'

export const startCountdown = (gameId, io) => {
  const intervalId = setInterval(() => {
    Game.find(gameId, io).then(game => {
      const countdown = (game.state.countdown || 4) - 1
      game.setState({ countdown })
      if (countdown === 0) clearInterval(intervalId)
    })
  }, 1000)
}

const saveHistory = ({ state: { players } }) => {
  players.filter(({ speed, progress }) => speed > 1 && progress > 2).forEach(({ id, speed, position }) => {
    new History({ user_id: id, speed, position }).save()
  })
}

const NEXT_GAME_COUNTDOWN_TIME = isProd ? 30 : 3
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
          saveHistory(game)
          game.reset()
        }
      })
      .catch(() => clearInterval(intervalId))
  }, 1000)
}
