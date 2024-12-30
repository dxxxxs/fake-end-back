const User = require('../models/user.model');
const {
    DatabaseError,
    UserNotFoundError,
    ValidationError
} = require('../utils/errors/CustomError');

async function createUser({ username, email, password }) {
    const userData = { username, email, password };
    try {
        const user = new User(userData);
        await user.save();
        return user;
    } catch (err) {
        throw new DatabaseError(`Failed to create user: ${err.message}`);
    }
}

async function getUserById(_id) {
    try {
        const user = await User.findById(_id);

        if (!user) {
            throw new UserNotFoundError(`User with ID ${_id} not found`);
        }

        return user;
    } catch (err) {
        if (err instanceof UserNotFoundError) throw err;
        throw new DatabaseError(`Failed to retrieve user by ID: ${err.message}`);
    }
}

async function getUserByEmail(email) {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new UserNotFoundError(`User with email ${email} not found`);
        }

        return user;
    } catch (err) {
        if (err instanceof UserNotFoundError) throw err;
        throw new DatabaseError(`Failed to retrieve user by email: ${err.message}`);
    }
}

async function deleteUser(_id) {
    try {
        const now = new Date();
        const user = await User.findByIdAndUpdate(_id, { deletedAt: now });

        if (!user) {
            throw new UserNotFoundError(`User with ID ${_id} not found`);
        }

        return user;
    } catch (err) {
        if (err instanceof UserNotFoundError) throw err;
        throw new DatabaseError(`Failed to delete user: ${err.message}`);
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

        const user = await User.findByIdAndUpdate(_id, updateData, { new: true });

        if (!user) {
            throw new UserNotFoundError(`User with ID ${_id} not found`);
        }

        return user;
    } catch (err) {
        if (err instanceof UserNotFoundError) throw err;
        throw new DatabaseError(`Failed to update user: ${err.message}`);
    }
}

module.exports = {
    createUser,
    getUserById,
    getUserByEmail,
    deleteUser,
    updateUser
};
