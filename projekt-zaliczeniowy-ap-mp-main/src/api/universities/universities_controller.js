const {Router}=require('express')
const University = require('../../models/university_model')
const asyncHandler = require("../../api/async-handler");

const router = new Router();

// POST /api/universities
router.post('/', asyncHandler(async (req,res)=>{ //sluzy do tworzenia zasobow
    const university = await University.query().insert({
        name: req.body.name,
        start_date: req.body.start_date,
        end_date: req.body.end_date
    });
    res.status(201).send(university); //kod http 201 dla utworzonego zasobu

}))

// DELETE /api/university/13
router.delete('/:id', asyncHandler(async(req,res) =>{
    const {id}=req.params;
    const university = await University.query().findById(id); // query sluzy do inicjalizacji transakcji
    if(!university) throw universitynotfoundException();
    const trx = await University.startTransaction(); // start transakacji
    try {
        await University.query(trx).deleteById(id);
        await trx.commit(); // zatwierdzenie transakcji
    } catch (err){
        await trx.rollback() //cofamy zmiany
        throw err;
    }
    res.status(204).end();
}))

module.exports = router;