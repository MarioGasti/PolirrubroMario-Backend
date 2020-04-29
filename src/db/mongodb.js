const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://admin:admin123@ds339648.mlab.com:39648/polirrubromario';
const DB = 'polirrubromario';

const conn = (dbToUse, cb) => {
    console.log('object');
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, database) => {
        if (err) return console.log(err);
        else {
            db = database.db(dbToUse);
            cb();
        }
    });
};

exports.test = (req, res) => {
    conn(DB, _ => {
        const collection = db.collection('Products');
        collection.insertMany([{
                '_id': 101010,
                'code': 101010,
                'description': 'Mayonesa',
                'quantity': 10,
                'buyprice': 15,
                'sellprice': 20,
                'provider': 'Hellman\'s'
            },
            {
                '_id': 111111,
                'code': 111111,
                'description': 'Ketchup',
                'quantity': 10,
                'buyprice': 20,
                'sellprice': 25,
                'provider': 'Hellman\'s'
            }
        ], (err, dbResult) => {
            if (err) console.log(err);
            else console.log(dbResult);
        });
    });
};

exports.find = (req, res) => {
    conn(DB, _ => {
        db.collection(req.params.collection).findOne({}, (err, dbResult) => {
            if (err) res.status(400).json({
                ok: false,
                status: 400,
                httpStatus: 400,
                err
            });
            else res.status(200).json({
                ok: true,
                status: 200,
                httpStatus: 200,
                dbResult
            });
        });
    });
};

exports.findQuery = (req, res) => {
    conn(DB, _ => {
        db.collection(req.params.collection).find({ '_id': req.body._id }).toArray((err, dbResult) => {
            if (err) res.status(400).json({
                ok: false,
                status: 400,
                httpStatus: 400,
                err
            });
            else res.status(200).json({
                ok: true,
                status: 200,
                httpStatus: 200,
                dbResult
            });
        });
    });
};

exports.findAll = (req, res) => {
    conn(DB, _ => {
        db.collection(req.params.collection).find().toArray((err, dbResult) => {
            if (err) res.status(400).json({
                ok: false,
                status: 400,
                httpStatus: 400,
                err
            });
            else res.status(200).json({
                ok: true,
                status: 200,
                httpStatus: 200,
                dbResult
            });
        });
    });
};

exports.insert = (req, res) => {
    conn(DB, _ => {
        // console.log(req.params);
        // console.log(req.body);
        db.collection(req.params.collection).insertOne(
            req.body.object, (err, dbResult) => {
                if (err) res.status(400).json({
                    ok: false,
                    status: 400,
                    httpStatus: 400,
                    err,
                    result: 'error'
                });
                else res.status(200).json({
                    ok: true,
                    status: 200,
                    httpStatus: 200,
                    dbResult,
                    result: 'success'
                });
            });
    });
};

exports.put = (req, res) => {
    conn(DB, _ => {
        db.collection(req.params.collection).updateOne({ '_id': req.body._id }, { '$set': req.body.object /* { 'quantity': 11, 'sellprice': 25 } */ }, (err, dbResult) => {
            if (err) res.status(400).json({
                ok: false,
                status: 400,
                httpStatus: 400,
                err
            });
            else res.status(200).json({
                ok: true,
                status: 200,
                httpStatus: 200,
                dbResult
            });
        });
    });
};

exports.delete = (req, res) => {
    conn(DB, _ => {
        db.collection(req.params.collection).deleteOne({ '_id': req.body._id }, (err, dbResult) => {
            if (err) res.status(400).json({
                ok: false,
                status: 400,
                httpStatus: 400,
                err
            });
            else res.status(200).json({
                ok: true,
                status: 200,
                httpStatus: 200,
                dbResult
            });
        });
    });
};