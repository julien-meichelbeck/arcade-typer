import renderApp from 'server/renderApp'
import Game from 'server/models/game'
import * as redis from 'server/redis'

const create = (req, res) => {
  Game.create().then(game => res.json(game.toClientData()))
}

const show = (req, res) => {
  Game.find(req.params.gameId)
    .then(() => res.send(renderApp(req)))
    .catch(error => {
      console.error(error)
      res.status(500)
      // res.status(404).redirect(NOT_FOUND)
    })
}

const index = (req, res) => {
  redis.connect().keys('games:*', (error, games) => res.send(renderApp(req, { games })))
}

export default { create, show, index }
