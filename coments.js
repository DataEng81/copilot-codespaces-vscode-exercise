// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

// Create connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'coments'
});

// Connect to database
connection.connect(error => {
    if(error){
        console.log('Error connecting to database: ', error);
    } else {
        console.log('Connected to database.');
    }
});

// Create app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Create routes
app.get('/coments', (req, res) => {
    const sql = 'SELECT * FROM coment';
    connection.query(sql, (error, results) => {
        if(error){
            console.log('Error: ', error);
        } else {
            res.json(results);
        }
    });
});

app.post('/coments', (req, res) => {
    const sql = 'INSERT INTO coment SET ?';
    const coment = {
        name: req.body.name,
        message: req.body.message
    };
    connection.query(sql, coment, error => {
        if(error){
            console.log('Error: ', error);
        } else {
            res.send('Coment added.');
        }
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server started on port 3000.');
});
