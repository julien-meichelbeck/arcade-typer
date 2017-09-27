// eslint-disable-no-named-as-default-member
import passport from 'passport'
import renderApp from 'server/renderApp'
import gamesController from 'server/controllers/gamesController'
import sessionsController from 'server/controllers/sessionsController'
import usersController from 'server/controllers/usersController'
import { gameRoute, PLAY_ROUTE, userRoute, LOGIN_ROUTE, LOGOUT_ROUTE } from 'shared/routes'

export default app => {
  app.get('/', gamesController.index)

  // Sessions
  app.post(LOGIN_ROUTE, sessionsController.login)
  app.get(LOGOUT_ROUTE, sessionsController.logout)

  // Games
  app.post(PLAY_ROUTE, gamesController.create)
  app.get(gameRoute(), gamesController.show)

  // API
  app.get(userRoute(), usersController.show)

  // Errors
  app.get('/500', () => {
    throw Error('Fake Internal Server Error')
  })

  // Views
  app.get('*', (req, res) => {
    res.send(renderApp(req))
  })

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.error(err.stack)
    res.status(500).send('Something went wrong!')
  })
}
