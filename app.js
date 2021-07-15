const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const controller = require('./controllers/controllersList');

const insModel = require('./models/inscriptionModel');

const app = express();

require('./models/dbconfig');

app.use(express.static('public'));
app.set('views', __dirname + '/views'); // general config
app.set('view engine', 'ejs');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(session({
    secret: 'loginpage',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.get('/', (req, res, next) => {
    res.render('login');
});


//-----------Login--------------------
app.get('/login', (req, res, next) => {
    res.render('login');
});

app.post('/login', controller.login);


//------------Inscription----------------
app.get('/inscription', (req, res, next) => {
    res.render('Inscription');
});

app.post('/inscription', controller.Inscription);

//---------------API------------
app.get('/api', (req, res) =>{
    insModel.find((err, data) => {
        if(!err) res.send(data)
        else console.log((err))
    })
})

//---------Single User----------------
app.get('/user:id', (req, res) => {
    var id = 1;
    insModel.find((err, data) =>{
        if (!err) {
            data[0]._id = id
            res.render('compte',{data: data, id: id})
        }
        else console.log(err) 
    });
    
})
module.exports = app;