const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const saucesCtrl = require('../controllers/sauces');

router.get('/', auth, saucesCtrl.getAllSauces);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.post('/', auth, multer, saucesCtrl.postOneSauce);
router.put('/:id', auth, multer, saucesCtrl.putOneSauce);
router.delete('/:id', auth, multer, saucesCtrl.deleteOneSauce);
router.post('/:id/like', auth, multer, saucesCtrl.postOneSauceLike);


module.exports = router;
