import passport from 'passport'
import LocalStrategy from 'passport-local'
import knex from 'server/database'
import { BAD_PASSWORD } from 'shared/errors'
import { createUser } from 'server/models/user'
import bcrypt from 'bcrypt'

export default app => {
  passport.use(
    new LocalStrategy((username, password, next) => {
      knex()
        .from('users')
        .where({ username })
        .first()
        .then(user => {
          if (user && bcrypt.compareSync(password, user.password)) {
            next(null, user)
          } else if (user) {
            next(null, false, { message: BAD_PASSWORD })
          } else {
            createUser({ username, password }).then(([id]) => {
              next(null, { username, id })
            })
          }
        })
    }),
  )

  passport.serializeUser((user, next) => {
    next(null, user.id)
  })

  passport.deserializeUser((id, next) => {
    knex()
      .from('users')
      .where({ id })
      .first()
      .then(user => next(null, user))
  })
  app.use(passport.initialize())
  app.use(passport.session())
}
