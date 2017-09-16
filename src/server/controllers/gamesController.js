import renderApp from 'server/renderApp'
import { setCurrentUser } from 'server/passport'
import { NOT_FOUND } from 'shared/routes'
import Game from 'server/models/game'

export const create = (req, res) => {
  res.json(Game.create().toClientData())
}

export const show = (req, res, next) => {
  setCurrentUser(req, res, next)
  Game.find(req.params.gameId)
    .then(() => res.send(renderApp(req)))
    .catch(error => {
      console.error(error)
      res.status(404).redirect(NOT_FOUND)
    })
}

export default { create, show }
