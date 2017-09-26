import bookshelf from 'server/bookshelf'

export default class Text extends bookshelf.Model {
  get tableName() {
    return 'texts'
  }
}
