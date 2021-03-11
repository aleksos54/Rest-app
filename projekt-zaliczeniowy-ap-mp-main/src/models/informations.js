const {Model} = require('objection') // z calego modulu objection wyciagamy tylko klase model
const knex = require('../knex') //mowie modelowi zeby korzystal z polaczenia za pomoca skonfigurowanej biblioteki knexjs
const BaseModel=require("./base_model");

Model.knex(knex); //skonfigurowana klasa model zaincicjalowana aby moc sie polaczyc z baza danych

class Information extends BaseModel{
    static get tableName(){ //tworze tabele, natomiast pola definiuje w migracjach
        return 'informations';
    }

    static relationMappings = {//opisuje relacje, instruuje orma co jest powiazane z czym //informacja musi wiedziec do jakiego uzytkownika nalezy
        user:{
            relation: Model.BelongsToOneRelation, //typ relacji
            modelClass: require('../user/user_model'),//zaladowanie modelu
            join: {
                from: 'informations.user_id', //laczymy z tabeli inforamtions user_id-foreign key
                to: 'users.id' //klucz primary_key
            }
        }
    };

}

module.exports = Information;