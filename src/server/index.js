import 'babel-polyfill'
import compression from 'compression'
import express from 'express'
import bodyParser from 'body-parser'
import { Server } from 'http'
import socketIO from 'socket.io'
import connectRedis from 'connect-redis'
import session from 'express-session'
import passport from 'server/passport'
import cookieParser from 'cookie-parser'
import routing from 'server/routing'
import { WEB_PORT, STATIC_PATH } from 'shared/config'
import { isProd } from 'shared/utils'
import * as redis from 'server/redis'
import setUpSocket from 'server/socket'

const RedisStore = connectRedis(session)
const app = express()
const http = Server(app)
const io = socketIO(http)
setUpSocket(io)

app.use(compression())
app.use(
  session({
    secret: 'MY_SECRET',
    store: new RedisStore({ client: redis.connect() }),
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 2592000000, // 30 days
    },
    // Touch is supported by the Redis store.
    // No need to resave, we can avoid concurrency issues.
    resave: false,
    saveUninitialized: false,
  }),
)
app.use(STATIC_PATH, express.static('dist'))
app.use(STATIC_PATH, express.static('public'))
app.use(bodyParser.json())
app.use(cookieParser())
passport(app)
routing(app)

http.listen(WEB_PORT, () => {
  console.log(
    `Server running on port ${WEB_PORT} ${isProd
      ? '(production)'
      : '(development).\nKeep "yarn dev:wds" running in an other terminal'}.`,
  )
})
