exports.up = function(knex) {
  return knex.schema.table('histories', function(table) {
    table.integer('position')
  })
}

exports.down = function(knex) {
  return knex.table('histories', function(table) {
    table.dropColumn('position')
  })
}
