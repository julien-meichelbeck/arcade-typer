exports.up = function(knex) {
  return knex.schema.createTable('histories', function(table) {
    table.increments()
    table.integer('user_id')
    table.foreign('user_id').references('users.id')
    table.integer('speed')
    table.timestamps()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('histories')
}
