import { Model } from 'objection'
import connect from 'server/database'

Model.knex(connect())

export default class Text extends Model {
  static get tableName() {
    return 'texts'
  }
}
