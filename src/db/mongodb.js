const MongoClient = require('mongodb').MongoClient;
const { ObjectID } = require('mongodb');
const crypto = require('crypto');
const path = require('path');

const url = 'mongodb://admin:admin123@ds339648.mlab.com:39648/polirrubromario';
const DB = 'polirrubromario';

const conn = (dbToUse, cb) => {
    /// console.log('object');
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, database) => {
        if (err) return console.log(err);
        else {
            db = database.db(dbToUse);
            cb();
        }
    });
};

exports.test = async(req, res) => {
    const getCryptoName = (file) => new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
            if (err) return reject(err);
            else resolve(buf.toString("hex") + path.extname(file.name));
        });
    });
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    const sampleFile = req.files.sampleFile;
    const filename = await getCryptoName(sampleFile);
    sampleFile.mv(`${ __dirname }/../assets/images/${ filename }`, err => {
        if (err) return res.status(500).send(err);
        // else res.json({
        //     ok: true,
        //     status: 200,
        //     httpStatus: 200,
        //     message: 'File uploaded!'
        // });
    });
    req.params.collection = 'Images';
    req.body.object = {
        object: {

        }
    };
    this.insert(req);
};

const uploadImage = async(file, res) => {
    const getCryptoName = file => new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
            if (err) return reject(err);
            else resolve(buf.toString("hex") + path.extname(file.name));
        });
    });
    const sampleFile = file;
    const filename = await getCryptoName(sampleFile);
    sampleFile.mv(`${ __dirname }/../assets/images/${ filename }`, err => {
        if (err) return res.status(500).send(err);
    });
    return filename;
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
    const query = {
        [req.params.key]: req.params.value
    };
    conn(DB, _ => {
        db.collection(req.params.collection).find(query).toArray((err, dbResult) => {
            if (err) res.status(400).json({
                ok: false,
                status: 400,
                httpStatus: 400,
                err
            });
            else {
                if (dbResult.length > 0)
                    res.status(200).json({
                        ok: true,
                        status: 200,
                        httpStatus: 200,
                        dbResult
                    });
                else {
                    const query = {
                        [req.params.key]: ObjectID(req.params.value)
                    };
                    conn(DB, _ => {
                        db.collection(req.params.collection).find(query).toArray((err, dbResult) => {
                            if (err) res.status(400).json({
                                ok: false,
                                status: 400,
                                httpStatus: 400,
                                err
                            });
                            else {
                                res.status(200).json({
                                    ok: true,
                                    status: 200,
                                    httpStatus: 200,
                                    dbResult
                                });
                            }
                        });
                    });
                }
            }
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

exports.insert = async(req, res) => {
    if (typeof req.body.object === 'string') req.body.object = JSON.parse(req.body.object);
    if (req.files) req.body.object.filename = await uploadImage(req.files.image, res);
    conn(DB, _ => {
        db.collection(req.params.collection).insertOne(
            req.body.object, (err, dbResult) => {
                if (res) {
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
                }
            });
    });
};

exports.put = (req, res) => {
    if (typeof req.body.object === 'string') req.body.object = JSON.parse(req.body.object);
    conn(DB, _ => {
        db.collection(req.params.collection).updateOne({ '_id': req.params._id }, { '$set': req.body.object /* { 'quantity': 11, 'sellprice': 25 } */ }, (err, dbResult) => {
            if (err) res.status(400).json({
                ok: false,
                status: 400,
                httpStatus: 400,
                err
            });
            else if (dbResult.n > 0)
                res.status(200).json({
                    ok: true,
                    status: 200,
                    httpStatus: 200,
                    dbResult
                });
            else {
                conn(DB, _ => {
                    db.collection(req.params.collection).updateOne({ '_id': ObjectID(req.params._id) }, { '$set': req.body.object /* { 'quantity': 11, 'sellprice': 25 } */ }, (err, dbResult) => {
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
            }
            console.log(dbResult);
        });
    });
};

exports.delete = (req, res) => {
    conn(DB, _ => {
        db.collection(req.params.collection).deleteOne({ '_id': req.params._id }, (err, dbResult) => {
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

exports.signup = (user, pass, data, cb) => {
    conn(DB, _ => {
        db.collection('Users').find({ 'user': user }).toArray((err, dbResult) => {
            if (err) return cb(err);
            else if (dbResult.length === 0) {
                db.collection('Users').insertOne({
                    user,
                    pass,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    genre: data.genre,
                    age: data.age,
                    address: data.address,
                    phone: data.phone,
                    email: data.email
                }, (err2, dbResult2) => {
                    if (err2) return cb(err2);
                    else return cb(null, dbResult2);
                });
            } else return cb(`Usuario ${ user } existente.`);
        });
    });
};

exports.checkUser = (user, cb) => {
    conn(DB, _ => {
        db.collection('Users').find({ 'user': user }).toArray((err, dbResult) => {
            if (err) return cb(err);
            else {
                if (dbResult.length === 0) return cb(`El usuario ${ user } no existe.`);
                else return cb(null, dbResult[0]);
            }
        });
    });
};