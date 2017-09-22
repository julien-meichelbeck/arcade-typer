import knex from 'knex'
import knexConfig from '../../knexfile'

let knexInstance

export default function connect() {
  if (!knexInstance) {
    knexInstance = knex(knexConfig[process.env.NODE_ENV || 'development'])
  }

  return knexInstance
}
