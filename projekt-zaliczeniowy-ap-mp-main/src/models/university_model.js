const {Model} = require('objection') // z calego modulu objection wyciagamy tylko klase model
const knex = require('../knex') //mowie modelowi zeby korzystal z polaczenia za pomoca skonfigurowanej biblioteki knexjs
const BaseModel=require("./base_model");

Model.knex(knex); //skonfigurowana klasa model zaincicjalowana aby moc sie polaczyc z baza danych

class University extends BaseModel{
    static get tableName(){ //tworze tabele, natomiast pola definiuje w migracjach
        return 'universities';
    }
    static get jsonSchema() { //nieobowiazkowe pole ktore waliduje dane przed zapisaniem ich do bazy
        return {
            type: 'object',
            properties: {
                name: {type: 'string'},
                start_date: {type: 'date'},
                end_date: {type: 'date'}
            }
        }
    }
}

module.exports = University;