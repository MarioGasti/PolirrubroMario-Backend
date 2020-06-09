const bcrypt = require('bcrypt');
const db = require('../db/mongodb');


exports.signup = (req, res) => {
    bcrypt.hash(req.body.pass, 10, function(err, hash) {
        if (err) return res.status(500).json({
            ok: false,
            status: 500,
            httpStatus: 500,
            err
        });
        else db.signup(req.body.user, hash, {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            genre: req.body.genre,
            age: req.body.age,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email
        }, (err, data) => {
            if (err) return res.status(500).json({
                ok: false,
                status: 500,
                httpStatus: 500,
                message: err
            });
            else return res.status(200).json({
                ok: true,
                status: 200,
                httpStatus: 200,
                result: data,
                message: 'Registrado con éxito!'
            });
        });
    });
};

exports.authenticate = (req, res) => {
    db.checkUser(req.body.user, (err, data) => {
        if (err) return res.status(500).json({
            ok: false,
            status: 500,
            httpStatus: 500,
            err
        });
        else {
            bcrypt.compare(req.body.pass, data.pass, function(err, result) {
                if (err) return res.status(500).json({
                    ok: result,
                    auth: result,
                    status: 500,
                    httpStatus: 500,
                    err
                });
                else if (result) return res.status(200).json({
                    ok: result,
                    auth: result,
                    status: 200,
                    httpStatus: 200,
                    message: `Usuario ${ req.body.user } ingresó con éxito.`,
                    username: req.body.user
                });
                else return res.status(500).json({
                    ok: result,
                    auth: result,
                    status: 500,
                    httpStatus: 500,
                    message: 'Usuario o contraseña erróneos.'
                });

            });

        }
    });
};