const sql = require('mssql');

exports.test = async(req, res) => {
    const config = {
        user: 'dbo',
        // password: 'mypassword',
        server: 'localhost',
        database: 'Products'
            // port: 1434
    };

    // connect to your database
    sql.connect(config, function(err) {

        if (err) console.log(err);

        // create Request object
        const request = new sql.Request();

        // query to the database and get the records
        request.query('select * from Student', function(err, recordset) {

            if (err) console.log(err)

            // send records as a response
            res.send(recordset);

        });
    });
};