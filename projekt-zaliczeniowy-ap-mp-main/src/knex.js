const knexConfig = require('../knexfile')
const knex = require('knex')(knexConfig)//uruchamiam to co zostalo zwrocone z danymi z konfiguracji
module.exports=knex
