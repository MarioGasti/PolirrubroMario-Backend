const express = require('express');
const router = require('./src/router');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());
app.use(bodyParser.json());
app.use(cors());
app.use(router);

app.listen(port, err => {
    if (err) throw new Error(err);
    else console.log(`Server running at ${ port }.`);
});