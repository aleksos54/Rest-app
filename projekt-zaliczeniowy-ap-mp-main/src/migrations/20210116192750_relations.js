//relacja 1 do 1
exports.up = function(knex) {
    return knex.schema.createTable("summaries",(table) =>{//tworze nowa tabele
        table.increments().primary();
        table.string("details").notNullable();
        table.string("hobby");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
        table.integer("user_id").unique().references("users.id").onDelete("CASCADE");//unikalny klucz stanowiacy referencje do books_id
        //cascade - jesli usuniemy usera to pochodne tez zostana usniete?
    }).createTable("companies",(table) =>{//tworze nowa tabele
        table.increments().primary();
        table.string("name").notNullable();
        table.integer("internship").notNullable();
        table.string("info");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
        table.integer("user_id").references("users.id").onDelete("CASCADE");//nie potrzebujemy klucz ograniczajacego do 1 do wielu
    }).createTable("users_universities",(table) =>{//tworze nowa tabele
        table.increments().primary();
        table.integer("user_id").references("users.id").onDelete("CASCADE");
        table.integer("university_id").references("users.id").onDelete("CASCADE");
    })

};

exports.down = function(knex){


};