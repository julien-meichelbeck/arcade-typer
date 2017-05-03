export const create = (req, res) => {
  res.json({
    success: true,
    account: req.user,
  })
}

export default { create }
