const { check } = require('express-validator');
 
const loginValidationRules = [
    check('username')
      .exists().withMessage('Username is required')
      .isString().withMessage('Username must be a string')
      .isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters'),
     
    check('password') 
      .exists().withMessage('Password is required')
      .isString().withMessage('Password must be a string')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  ];


module.exports = loginValidationRules; 
  