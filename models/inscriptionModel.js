const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const InsSchema = mongoose.Schema({
    name: { type: String, required: 'Name cannot be empty' },
    email: { type: String, required: 'Email cannot be empty' },
    password: { type: String, required: true },
    confirmpassword: { type: String}
});

// InsSchema.pre('save', (next) =>{
//     bcrypt.genSalt(10, (err, salt) =>{
//         bcrypt.hash(this.password, salt, (err, hash) =>{
//             this.password = hash;
//             next();
//         });
//     });
// });

module.exports = mongoose.model('Inscription', InsSchema);