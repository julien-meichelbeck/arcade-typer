// eslint-disable-no-named-as-default-member
import passport from 'passport'
import renderApp from 'server/renderApp'
import gamesController from 'server/controllers/gamesController'
import sessionsController from 'server/controllers/sessionsController'
import { setCurrentUser } from 'server/passport'
import {
  gameRoute,
  PLAY_ROUTE,
  LOGIN_ROUTE,
} from 'shared/routes'

export default (app) => {
  // Sessions
  app.post(LOGIN_ROUTE, passport.authenticate('local'), sessionsController.create)

  // Games
  app.post(PLAY_ROUTE, gamesController.create)
  app.get(gameRoute(), gamesController.show)

  // Views
  app.get('*', (req, res, next) => {
    setCurrentUser(req, res, next)
    res.send(renderApp(req))
  })

  // Errors
  app.get('/500', () => {
    throw Error('Fake Internal Server Error')
  })

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.error(err.stack)
    res.status(500).send('Something went wrong!')
  })
}
