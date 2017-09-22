import renderApp from 'server/renderApp'
import { NOT_FOUND } from 'shared/routes'
import Game from 'server/models/game'

export const create = (req, res) => {
  Game.create().then(game => res.json(game.toClientData()))
}

export const show = (req, res) => {
  Game.find(req.params.gameId)
    .then(() => res.send(renderApp(req)))
    .catch(error => {
      console.error(error)
      res.status(404).redirect(NOT_FOUND)
    })
}

export default { create, show }
