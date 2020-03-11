const express = require('express');
const router = express.Router();

const mongodb = require('./db/mongodb');
const mssql = require('./db/mssql');

router.get('/', mssql.test);
router.get('/find/:collection', mongodb.find);
router.get('/findQuery/:collection/:_id', mongodb.findQuery);
router.get('/findAll/:collection', mongodb.findAll);
router.post('/insert/:collection', mongodb.insert);
router.put('/put/:collection/:_id', mongodb.put);
router.delete('/delete/:collection/:_id', mongodb.delete);


module.exports = router;