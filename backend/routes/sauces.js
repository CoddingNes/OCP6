const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const saucesCtrl = require('../controllers/sauces');

router.get('/', saucesCtrl.getAllSauces);
router.get('/:id', saucesCtrl.getOneSauce);
router.post('/', auth, multer, saucesCtrl.postOneSauce);
router.put('/:id', auth, multer, saucesCtrl.putOneSauce);
router.delete('/:id', auth, multer, saucesCtrl.deleteOneSauce);
router.post('/:id/like', saucesCtrl.postOneSauceLike);


module.exports = router;
