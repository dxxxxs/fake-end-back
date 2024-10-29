const User = require('../models/user.model');

async function createUser({ username, email, password }) {
    const userData = { username, email, password };
    try {
        const user = new User(userData);
        await user.save();
        return user;
    } catch (err) {
        throw err;
    }
}

async function getUserById(_id) {
    try {
        return User.findById(_id);
    } catch (err) {
        throw err;
    }
}

async function getUserByEmail(email) {
    try {
        return User.findOne({ email: email });
    } catch (err) {
        throw err;
    }
}

async function deleteUser(_id) {
    try {
        const now = new Date();
        return User.findByIdAndUpdate(_id, { deletedAt: now });
    } catch (err) {
        throw err;
    }
}

async function updateUser({ _id, password, username }) {
    try {
        const updateData = {};
        if (password) {
            updateData.password = password;
        }
        if (username) {
            updateData.username = username;
        }
        return User.findByIdAndUpdate(_id, updateData, { new: true });
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createUser,
    getUserById,
    getUserByEmail,
    deleteUser,
    updateUser
}
