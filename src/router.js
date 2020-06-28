const express = require('express');
const router = express.Router();

const mongodb = require('./db/mongodb');
const mssql = require('./db/mssql');
const login = require('./login/login');
const valid = require('./valid');
const push = require('./push/oneSignal');

router.post('/', mongodb.test);
router.get('/find/:collection', mongodb.find);
router.get('/findQuery/:collection/:key/:value', mongodb.findQuery);
router.get('/findAll/:collection', mongodb.findAll);
router.post('/insert/:collection', mongodb.insert);
router.post('/login/signup', [valid.missingSignUpData], login.signup);
router.post('/login/authenticate', login.authenticate);
router.put('/put/:collection/:_id', mongodb.put);
router.delete('/delete/:collection/:_id', mongodb.delete);
router.post('/push/postAll', push.postAll);
router.post('/push/postById/:id', push.postByID);
router.post('/push/postByGroup/:group', push.postByGroup);
router.post('/push/postByTag/:tag', push.postByTag);
router.post('/push/editDevice/:id', push.editDevice);
router.get('/push/getDevice/:id', push.getDevice);
router.get('/push/getDevices', push.getDevices);
router.get('/push/getTrack/:notificationId', push.getTrack);

module.exports = router;