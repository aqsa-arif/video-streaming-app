const { check } = require('express-validator');
 
const videoValidationRules = [
    check('title')
      .exists().withMessage('Title is required')
      .isString().withMessage('Title must be a string')
      .isLength({ min: 3, max: 20 }).withMessage('Title must be between 3 and 20 characters'),

    check('desc')
      .exists().withMessage('Description is required')
      .isString().withMessage('Description must be a string')
      .isLength({ min: 5, max: 100 }).withMessage('Description must be between 5 and 100 characters'),

    check('imgUrl') 
      .exists().withMessage('Thumbnail is required'),

    check('videoUrl') 
      .exists().withMessage('Video is required'),

    check('tags') 
      .exists().withMessage('Tags are required'),
];


module.exports = videoValidationRules; 
  