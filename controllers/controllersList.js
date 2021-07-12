const insModel = require('../models/inscriptionModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.Inscription = (req, res, next) => {
    delete req.body._id;

    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const inscript = new insModel({
                "name": req.body.name,
                "email": req.body.email,
                "password": hash,
            })
            if (req.body.password != req.body.confirmpassword) {
                inscript.save()
                    .then(() => res.status(400).json({ message: 'Confirmation mot de passe incorrect' }))
                    .catch(error => res.status(400).json({ error }))
            } else {
                inscript.save()
                    .then(() => res.status(201).json({ message: 'Contact ' + req.body.name + ' enregistré avec succès' }))
                    .catch(error => res.status(400).json({ error }))
            }
        })
        .catch(error => res.status(500).json({ error }))
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