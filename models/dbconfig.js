const mongoose = require('mongoose');

const connect = mongoose.connect('mongodb://localhost/loginPage', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

module.exports = connect;