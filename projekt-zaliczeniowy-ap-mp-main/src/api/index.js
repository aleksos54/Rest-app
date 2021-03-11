const {Router}=require('express') //obiekt ktory mapuje adres http na dana funkcje
const userRouter=require('./users/user_controller')
const universitiesRouter=require('./universities/universities_controller')
const router = new Router();

router.use('/users',userRouter ); //wszystko co w booksRouter bedzie mialo prefix users, wczytuje routing z poszczegolnych katalogow
router.use('/universities',universitiesRouter);
module.exports=router;