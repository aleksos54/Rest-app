const {Model} = require('objection') // z calego modulu objection wyciagamy tylko klase model
const knex = require('../knex') //mowie modelowi zeby korzystal z polaczenia za pomoca skonfigurowanej biblioteki knexjs
const BaseModel=require("./base_model");

Model.knex(knex); //skonfigurowana klasa model zaincicjalowana aby moc sie polaczyc z baza danych

class User extends BaseModel{
    static get tableName(){ //tworze tabele, natomiast pola definiuje w migracjach
        return 'users';
    }
    static get jsonSchema() { //nieobowiazkowe pole ktore waliduje dane przed zapisaniem ich do bazy
        return {
            type: 'object',
            properties: {
                name: {type: 'string'},
                surname: {type: 'string'},
                age: {type: 'integer'}
            }
        }
    }
    static get relationMappings(){
        const University = require("./university_model")

        return{
            summary: {
                relation: Model.HasOneRelation,
                modelClass: require('./summary_model'),
                join: {
                    from: 'users.id',
                    to: 'summaries.user_id'
                }
            },
            companies:{
                relation:Model.HasManyRelation,
                modelClass: require('./company_model'),
                join:{
                    from: "users.id",
                    to: "companies.user_id"
                }
            },
            universities: {
                relation: Model.ManyToManyRelation,
                modelClass: University,
                join: {
                    from: 'users.id',
                    to: 'universities.id',
                    through:{
                        from: 'users_universities.user_id',
                        to:'users_universities.university_id'
                    },
                },
            },
        }
    }
}

module.exports = User;