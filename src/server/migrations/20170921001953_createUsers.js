exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments()
    table.string('username')
    table.string('password')
    table.timestamps()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('users')
}
