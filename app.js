const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const controller = require('./controllers/controllersList');

const app = express();

mongoose.connect('mongodb://localhost/loginPage', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

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
    res.render('index');
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


module.exports = app;