const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const { getUser, updateUser, deleteUser, subscribe, unsubscribe } = require('../controllers/user');

const router = express.Router(); 

// get user
router.get('/get/:userId', getUser );
// update user
router.put('/update/:id', verifyToken, updateUser);
// delete user
router.delete('/delete/:id', verifyToken, deleteUser);
// subscribe user
router.put('/subscribe/:id', verifyToken, subscribe );
// unsubscribe user
router.put('/unsubscribe/:id', verifyToken, unsubscribe); 


module.exports = router;