const path=require('path')

const config ={
    client: 'sqlite3',
    connection: {
    filename: './dev.sqlite3' //tu przechowywana baza
  },
  migrations: {
      directory: path.join(__dirname, 'src', 'migrations')
  },
  pool: { //fragment konfiguracji, pool - informacja o polaczeniu
        afterCreate: (conn, cb) => {
            conn.run('PRAGMA foreign_keys=ON',cb) //na polaczeniu wykonac pragma, to sprawia wlaczenie kluczy zewnetrznych, dzieki czemu bedzie mozna zrobic relacje
        },
  },



};

module.exports = config
