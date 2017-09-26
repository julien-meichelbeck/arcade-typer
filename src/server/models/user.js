import bookshelf from 'server/bookshelf'
import bcrypt from 'bcrypt'

const saltRounds = 10

export default class User extends bookshelf.Model {
  get tableName() {
    return 'users'
  }
}

export const createUser = async ({ username, password }) => {
  const hash = await bcrypt.hash(password, saltRounds)
  const user = await new User({ username, password: hash }).save()
  return user.get('id')
}
