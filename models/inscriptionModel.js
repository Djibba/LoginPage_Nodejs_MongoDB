const mongoose = require('mongoose');

const InsSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmpassword: { type: String}
});

module.exports = mongoose.model('Inscription', InsSchema);