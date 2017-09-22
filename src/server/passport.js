import passport from 'passport'
import LocalStrategy from 'passport-local'
import knex from 'server/database'

export default app => {
  passport.use(
    new LocalStrategy((username, pwd, done) => {
      knex()
        .from('users')
        .where({ username })
        .first()
        .then(user => {
          if (user.password === pwd) {
            done(null, user)
          } else {
            done(null, false)
          }
        })
    }),
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    knex()
      .from('users')
      .where({ id })
      .first()
      .then(user => done(null, user))
  })
  app.use(passport.initialize())
  app.use(passport.session())
}
