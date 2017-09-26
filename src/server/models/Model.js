import bookshelf from 'server/bookshelf'

export default class Model extends bookshelf.Model {
  get hasTimestamps() {
    return ['created_at', 'updated_at']
  }
}
