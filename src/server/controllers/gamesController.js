import renderApp from 'server/renderApp'
import { setCurrentUser } from 'server/passport'
import Game from 'server/models/game'

export const create = (req, res) => {
  res.json(Game.create().toClientData())
}

export const show = (req, res, next) => {
  setCurrentUser(req, res, next)
  Game.find(req.params.id, (game) => {
    res.send(renderApp(req, { game: game.toClientData() }))
  })
}

export default { create, show }
