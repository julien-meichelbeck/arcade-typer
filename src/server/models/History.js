import Model from './Model'
import User from './Users'

export default class History extends Model {
  get tableName() {
    return 'histories'
  }

  get hasTimestamps() {
    return ['created_at', 'updated_at']
  }

  user() {
    this.belongsTo(User)
  }
}
