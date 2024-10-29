const userRepository = require('../repositories/user.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



class Login {
    async execute({ email, password }) {
        const user = await userRepository.getUserByEmail(email);

        const secret = process.env.JWT_SECRET;

        if (!user || user.deletedAt) {
            throw new Error('User not found');
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            throw new Error('Password is not valid');
        }

        const token = jwt.sign({ _id: user._id, username: user.username, email: user.email }, secret);

        return { user, token };
    }
}

module.exports = Login;