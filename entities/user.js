const mongoose = require('mongoose');

// Definição do esquema do usuário
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    skillsOffered: [String],
    skillsWanted: [String]
});

// Modelo de usuário
const User = mongoose.model('User', userSchema);

module.exports = User;
