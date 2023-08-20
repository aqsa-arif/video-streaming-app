const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const { addcomment, getComments, deleteComment } = require('../controllers/comment');

const router = express.Router();

router.post('/addcomment', verifyToken, addcomment )
router.get('/get/:id', getComments)
router.delete('/delete/:id', verifyToken, deleteComment)

module.exports = router;