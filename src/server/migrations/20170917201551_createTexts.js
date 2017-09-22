exports.up = function(knex) {
  return knex.schema.createTable('texts', function(table) {
    table.increments()
    table.string('source')
    table.text('body')
    table.timestamps()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('texts')
}
