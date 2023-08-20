const express = require('express');
const { signupUser, loginUser, googleAuth } = require('../controllers/auth');
const signupValidationRules = require('../middlewares/signupValidation');
const loginValidationRules = require('../middlewares/loginValidation');

const router = express.Router();



router.post('/signup', signupValidationRules , signupUser );

router.post('/login', loginValidationRules , loginUser );


router.post('/googleAuth',  googleAuth );



module.exports = router;