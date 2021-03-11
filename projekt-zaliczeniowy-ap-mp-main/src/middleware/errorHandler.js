const errorHandler = (err,req,res,next) => { //funkcja ktora zawsze przyjmuje 4 parametry
    console.error(err.stack); //wypisanie bledu na konsoli, mozna w tym miejscu przekazac blad do uslugi
    res.status(err.status || 500).send( //jesli blad ma wlasny status to go podaje, jesli nie to blad 500 i odeslij uzytkownikowi message
        {
            message: err.message || 'Error occurred'
        }
    )

}

module.exports = errorHandler;