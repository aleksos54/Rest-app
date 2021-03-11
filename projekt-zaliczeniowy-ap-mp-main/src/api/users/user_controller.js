const {Router}=require('express')
const User = require('../../models/user_model')
const University = require('../../models/university_model')
const asyncHandler = require("../../api/async-handler");
const userNotFoundException = require("../../exceptions/usernotfoundException");

const router = new Router();

// GET /api/users
router.get('/',asyncHandler(async(req,res) => { //pobiera wszystkich uzytkownikow
    let users= User             //await - oczekiwanie na wykonanie kodu bazodanowego ( wymaga aby metoda w ktorej znajduje sie await byla asynchroniczna)
        .query()                        // bez await tworzymy zapytanie, ale nie przesylamy go do bazy
        .select('users.name','users.surname','users.age', 'users.id')
        .withGraphJoined('summary')//podajemy nazwe relacji
        .withGraphJoined('companies') //joiny
        .withGraphJoined('universities')
        .modifyGraph('summary', builder => builder.select('details', 'hobby')) //modyfikujemy ktore kolumny chcemy zobaczyc
        .modifyGraph('companies', builder => builder.select('name','internship','info'))

    if(req.query.name){ //jesli poda name przefiltrujemy zapytanie z where
        users = users.where('users.name', 'like', `%${req.query.name}%`) //przefiltrujemy name takie jak -> zapytanie
    }

    if(req.query.surname){ //jesli poda surname przefiltrujemy zapytanie z where
        users = users.where('users.surname', 'like', `%${req.query.surname}%`) //przefiltrujemy surname takie jak -> zapytanie
    }


    res.send(await users); //wykonuje sie zapytanie
}))

// GET /api/users/13 to id=13
router.get('/:id',asyncHandler(async(req,res)=> {
    const {id}=req.params; //pobranie identyfikatora z requestu
    const user = await User.query().findById(id); //szukam po id
    if(!user) throw new userNotFoundException();
    res.send(user);
}))
// POST /api/users
router.post('/', asyncHandler(async (req,res)=>{ //sluzy do tworzenia zasobow
        // const user = await User.query().insert({
        //     name: req.body.name
        // });
    const {university_id, name,surname,age, summary_details,summary_hobby,companies} = req.body; //destrukutryzacja, wyciagamy element, DTO, strukutry sluzace do transferu danych
    const university = await University.query().findById(university_id);
    if(!university) throw new UniversitynotfoundException();

    const user = await User.query().insertGraphAndFetch({ //funkca ktora obsluguje wiele zapytan naraz
        name,
        surname,
        age,
        summary: {
            details: summary_details,
            hobby: summary_hobby
        },
        companies,
        universities: [{
            '#dbRef': university_id //referencja do istniejacego juz w bazie obiektu
        }]
    })
    res.status(201).send(user); //kod http 201 dla utworzonego zasobu

}))
// PUT /api/users/13 id=13
router.put('/:id',asyncHandler(async(req,res)=>{ //sluzy do mozliwosci edycji, request wszystko co klient przesle, response - to co odsylamy klientowi
    const id = req.params.id;
    const updatedUser = await User.query().patchAndFetchById(id,req.body) //podajemy id i to co ma byc zmienione
    if(!updatedUser) throw new userNotFoundException();
    res.send(updatedUser); //po edycji zwracamy zmienionego uzytkownika
}))

// DELETE /api/users/13
router.delete('/:id', asyncHandler(async(req,res) =>{
    const {id}=req.params;
    const user = await User.query().findById(id); // query sluzy do inicjalizacji transakcji
    if(!user) throw userNotFoundException();
    const trx = await User.startTransaction(); // start transakacji
    try {
        await User.query(trx).deleteById(id);
        await trx.commit(); // zatwierdzenie transakcji
    } catch (err){
        await trx.rollback() //cofamy zmiany
        throw err;
    }
    // const {id}=req.params;
    // const deletedCount= await User.query().deleteById(id);
    // if(deletedCount==0) throw new userNotFoundException();
    res.status(204).end();
}))

module.exports=router;