const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    deletedAt: { type: Date, required: false }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
