const userRepository = require('../repositories/user.repository');
const bcrypt = require('bcrypt');
const GenerateToken = require('./generate-token');
const { AuthenticationError, InvalidCredentialsError } = require('../utils/errors/CustomError');


class Login {
    async execute({ email, password }) {
        const user = await userRepository.getUserByEmail(email);

        if (!user || user.deletedAt) {
            throw new AuthenticationError('User not found');
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            throw new InvalidCredentialsError('Password is not valid');
        }

        const generateToken = new GenerateToken();

        const token = await generateToken.execute({ user_id: user._id, username: user.username, email: user.email })

        return { user, token };
    }
}

module.exports = Login;