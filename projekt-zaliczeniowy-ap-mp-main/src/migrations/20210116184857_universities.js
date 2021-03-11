
exports.up = function(knex) {
    return knex.schema.createTable('universities', (table) =>{
        table.increments().primary(); //tworzona kolumna o nazwie id, ktora bedzie glowna kolumna z indexem primary
        table.string('name').notNullable();
        table.date('start_date').notNullable();
        table.date('end_date');
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('universities');
};
