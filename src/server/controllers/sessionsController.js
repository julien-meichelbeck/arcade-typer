export const login = (req, res) => {
  res.json({
    success: true,
    account: req.user,
  })
}

export const logout = (req, res) => {
  req.logout()
  res.redirect('/')
}

export default { login, logout }
