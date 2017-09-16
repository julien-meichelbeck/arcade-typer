import passport from 'passport'

export const setCurrentUser = passport.authenticate('local', (error, user, info) => {
  // console.log({ error, user, info }) TODO
})
