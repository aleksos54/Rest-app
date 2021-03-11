const asyncHandler = (callback)=>{ //przyjmuje funkcje callback, przyjmuje nasz routing
    return function (req,res,next) { //zwraca inna funkcje, ktora bedzie nowym routingiem
        callback(req,res,next).catch(next); //uruchamiamy nasz routing , globalny catch na kazdy blad
                                            //next- funkcja kazdego routingu, ktora pozwala lapac bledy, wszystkie bledy sa tu przekazywane

    }
}

module.exports = asyncHandler; //eksportuje referencje do funkcji