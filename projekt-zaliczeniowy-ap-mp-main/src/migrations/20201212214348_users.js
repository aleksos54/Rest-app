
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) =>{
      table.increments().primary(); //tworzona kolumna o nazwie id, ktora bedzie glowna kolumna z indexem primary
      table.string('name').notNullable();
      table.string('surname').notNullable();
      table.integer('age').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
