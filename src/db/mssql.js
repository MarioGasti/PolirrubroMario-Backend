const sql = require('mssql');

exports.test = async(req, res) => {
    const config = {
        user: 'sa',
        password: 'password123456789',
        server: 'localhost',
        database: 'polirrubromario',
        port: 52165
    };

    // connect to your database
    sql.connect(config, function(err) {

        if (err) console.log(err);

        // create Request object
        const request = new sql.Request();

        // query to the database and get the records
        request.query('select * from Products', function(err, recordset) {

            if (err) console.log(err);

            // send records as a response
            res.send(recordset);

        });
    });
};