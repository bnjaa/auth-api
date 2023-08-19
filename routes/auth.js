const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, renewToken, list } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.post('/new', 
[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
] ,
createUser);

router.post('/', loginUser);
router.get('/renew', validateJWT ,renewToken);

router.get('/list', validateJWT ,list);


module.exports = router;