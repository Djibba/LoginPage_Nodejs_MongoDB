const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const InsSchema = mongoose.Schema({
    name: { type: String, required: 'Name cannot be empty' },
    email: { type: String, required: 'Email cannot be empty' },
    password: { type: String, required: true },
    confirmpassword: { type: String}
});

module.exports = mongoose.model('Inscription', InsSchema);