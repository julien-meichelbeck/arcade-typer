import passport from 'passport'

export const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err)
    if (info) return res.json({ success: false, ...info })
    return req.login(user, () => res.json({ success: true, account: req.user }))
  })(req, res, next)
}

export const logout = (req, res) => {
  req.logout()
  res.redirect('/')
}

export default { login, logout }
