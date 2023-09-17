const { log, error } = require('console');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();


const storage = multer.diskStorage({
    destination: function (req, file, cp) {
        cp(null, 'uploads/');
    },
    filename: function (req, file, cp) {
        cp(null, file.originalname );
    }
});
const fileFilter = (req, file, cp) => {
    if (file.mimetype === 'application/pdf') {
        cp(null, true);
    } else {
        cp(new Error('File type not supported'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use(upload.single('file'));

app.use((req, res, next) => {

    res.setHeader('Access-control-Allow-Origin', '*');
    res.setHeader('Access-control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH');
    res.setHeader('Access-control-Allow-Headers', 'Content-type , Authorization');
    next();


})

const adminrouter = require('./routes/admin');

const dashboardrouter = require('./routes/dashboard');

const shoprouter = require('./routes/shop');

app.use(dashboardrouter);

app.use(adminrouter);

app.use(shoprouter);


app.use(express.static(path.join(__dirname, 'public')));

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const massage = error.massage;

    res.status(status).json({ massage: massage });
})


mongoose.connect('mongodb://127.0.0.1:27017/')
    .then(result => {

        app.listen(3001, () => {

            console.log('connect to 3001');
        })

    }).catch(err => {
        

        console.log(err);

    })