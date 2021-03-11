const express = require('express')
const api = require('./src/api') //ta linijka wczyta routing z pliku src/api/index
const errorHandler = require("./src/middleware/errorHandler");
const databaseErrorHandler = require("./src/middleware/databaseErrorHandler");


const port = process.env.PORT || 9000
const env = process.env.NODE_ENV || 'development';
const app = express();
app.use(express.json());
app.use('/api', api) //w prefixie dajemy to co ma sie znalezc przed kazdym adresem

app.use(databaseErrorHandler)
app.use(errorHandler);

// const db=[
//
// ];
// app.get('/' , (req,res) => {
//     res.send({msg: 'Witam'})
// })
//
// app.post('/users', (req, res ) => {
//     const {name,surname} = req.body;
//     //const name = req.body.name;
//     const user={name,surname};
//     db.push({user});
//     res.status(201).send(user);
//
// })
// app.get('/users', (req,res) =>{
//     res.send(db);
// })


app.listen(port, '127.0.0.1', () => {
    console.log(`Server listeninig on http://127.0.0.1:${port} in ${env} mode`);

})