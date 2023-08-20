const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const { getByTag, getVideo, addVideo, updateVideo, addview, deleteVideo, random, subscriptions, trending, search, addlikes, addDislikes } = require('../controllers/video');
const Video = require('../models/Video');
const videoValidationRules = require('../middlewares/uploadValidation');

const router = express.Router();

// addVideo, addView, getByTag, getVideo, random, search, sub, trend

router.get('/get/:videoId',  getVideo );
router.post('/add', verifyToken, videoValidationRules , addVideo  );
router.put('/update/:id', verifyToken, updateVideo );
router.put('/addview/:id', verifyToken, addview );
router.delete('/delete/:id', verifyToken, deleteVideo );
router.get('/getByTag', getByTag );
router.get('/random', random );
router.get('/subscriptions', verifyToken, subscriptions );
router.get('/trending',  trending );
router.get('/search',  search );

router.put('/likes/:id', verifyToken, addlikes );
router.put('/dislikes/:id', verifyToken, addDislikes );

module.exports = router;