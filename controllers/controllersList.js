const insModel = require('../models/inscriptionModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = mongoose.model('Inscription');

exports.Inscription = (req, res, next) => {

    var hash = bcrypt.hashSync(req.body.password, 10);

    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = hash;

    if (req.body.password != req.body.confirmpassword) {
        user.save()
            .then(() => res.status(400).json({ message: 'Confirmation mot de passe incorrect' }))
            .catch(error => res.status(400).json({ error }))
    } else {
        user.save()
            .then(() => res.status(201).json({ message: 'Contact ' + req.body.name + ' enregistré avec succès' }))
            .catch(error => res.status(400).json({ error }));

    }

};

exports.login = (req, res, next) => {
    insModel.findOne({ "email": req.body.email })
        .then(inscript => {
            if (!inscript) {
                return res.status(401).json({ error: 'Utilisateur non trouvé ! ' })
            }
            bcrypt.compare(req.body.password, inscript.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect' });
                    }
                    res.status(200).json({
                        // inscriptId: inscript._id,
                        // token: jwt.sign({ inscriptId: inscript._id },
                        //     'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }
                        // ),
                        message: "Connexion au compte " + req.body.email + " avec succés"
                    })
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
}