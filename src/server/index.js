import 'babel-polyfill'
import compression from 'compression'
import express from 'express'
import { Server } from 'http'
import socketIO from 'socket.io'
import session from 'express-session'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import LocalStrategy from 'passport-local'
import routing from 'server/routing'
import { WEB_PORT, STATIC_PATH } from 'shared/config'
import { isProd } from 'shared/utils'
import setUpSocket from 'server/socket'
import sandbox from 'server/sandbox'

const USERS = [
  { id: 123, username: 'foo', password: 'bar', token: 'dzjakljdzaljdazkljzad' },
  { id: 455, username: 'clark', password: 'kent', token: 'odizoijakljdzaljdazkljzad' },
]

const strategy = new LocalStrategy(
  (user, pwd, done) => {
    const currentUser =
      USERS.find(({ username, password }) => user === username && pwd === password)
    if (currentUser) {
      done(null, currentUser)
    } else {
      done(null, false)
    }
  },
)
passport.use(strategy)
passport.serializeUser((user, done) => {
  done(null, user.token)
})

passport.deserializeUser((authToken, done) => {
  const user = USERS.find(({ token }) => token === authToken)
  done(null, user)
})

const app = express()
// flow-disable-next-line
const http = Server(app)
const io = socketIO(http)
setUpSocket(io)

app.use(compression())
app.use(session({
  secret: 'MY_SECRET',
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 2592000000, // 30 days
  },
  // Touch is supported by the Redis store.
  // No need to resave, we can avoid concurrency issues.
  resave: false,
  saveUninitialized: false,
}))
app.use(STATIC_PATH, express.static('dist'))
app.use(STATIC_PATH, express.static('public'))
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())


routing(app)

http.listen(WEB_PORT, () => {
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' :
    '(development).\nKeep "yarn dev:wds" running in an other terminal'}.`)
})
sandbox()
