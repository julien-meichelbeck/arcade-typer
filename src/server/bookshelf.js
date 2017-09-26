import bookshelf from 'bookshelf'
import knex from 'knex'
import knexConfig from '../../knexfile'

const knexInstance = knex(knexConfig[process.env.NODE_ENV || 'development'])
const bookshelfInstance = bookshelf(knexInstance)

export default bookshelfInstance
