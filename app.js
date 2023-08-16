const { log } = require('console');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({
    extended: false
}));

const adminrouter = require('./routes/admin');

const dashboardrouter = require('./routes/dashboard');

app.use(dashboardrouter);


app.use(adminrouter);


app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect('mongodb://127.0.0.1:27017/')
    .then(result => {

        app.listen(3001, () => {

            console.log('connect to 3001');
        })

    }).catch(err => {

        console.log(err);

    })