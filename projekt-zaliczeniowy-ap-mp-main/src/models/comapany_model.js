const Base=require("../base");
const {Model} = require('objection') // z calego modulu objection wyciagamy tylko klase model

class Company extends Base{
    static get tableName(){ //tworze tabele, natomiast pola definiuje w migracjach
        return 'companies';
    }

    static relationMappings = {//opisuje relacje, instruuje orma co jest powiazane z czym //informacja musi wiedziec do jakiego uzytkownika nalezy
        user:{
            relation: Model.BelongsToOneRelation, //z punktu widzenie tabeli company jeden element nalezy do jednego usera
            modelClass: require('../user/user_model'),//zaladowanie modelu
            join: {
                from: 'companies.user_id', //laczymy z tabeli companies user_id-foreign key
                to: 'users.id' //klucz primary_key
            }
        }
    };

}

module.exports = Company;