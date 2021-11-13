const express = require('express');
const { signout } = require('../controllers/admin/uath');
const { signup, signin } = require('../controllers/uath');
const router = express.Router();
const { validateRequest, validatesigninRequest, isRequestValidated } = require('../validator/auth');


router.post('/signin', validatesigninRequest, isRequestValidated, signin);
router.post('/signup', validateRequest, isRequestValidated, signup);
router.post('/signout', isRequestValidated, signout );


module.exports = router;