import bcrypt from 'bcrypt'
import Model from './Model'
import History from './History'

const SALT_ROUNDS = 10

export default class User extends Model {
  get tableName() {
    return 'users'
  }

  histories() {
    this.hasMany(History)
  }

  static async createUser({ username, password }) {
    const hash = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await new User({ username, password: hash }).save()
    return user.get('id')
  }
}
