import History from 'server/models/History'

export const show = (req, res) => {
  History.where('user_id', req.params.userId)
    .orderBy('created_at', 'desc')
    .fetchAll()
    .then(histories => res.json(histories.toJSON()))
    .catch(console.error)
}

export default { show }
