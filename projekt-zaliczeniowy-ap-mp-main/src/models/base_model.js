const {Model} = require('objection')
const knex = require('../knex')

Model.knex(knex);

class BaseModel extends Model { //klasa rozszerza model

    $beforeInsert(queryContext) { //chcemy wiedziec kiedy kazdy model, ktory dziedziczy po basemodelu zostal do bazy dodany oraz zak
        this.created_at = new Date().toISOString();
        this.updated_at = new Date().toISOString();
    }

    $beforeUpdate(opt, queryContext) {
        this.updated_at = new Date().toISOString();
    }

    $formatDatabaseJson(json) { //zabezpieczenie aby nie mozna bylo zmieniac identyfikatora w bazie danych
        json = super.$formatDatabaseJson(json);
        delete json.id; //usuwam properties
        return json;
    }


}
module.exports= BaseModel;