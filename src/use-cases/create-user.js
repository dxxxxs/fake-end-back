const userRepository = require('../repositories/user.repository');
const bcrypt = require('bcrypt');
const { UserAlreadyExistsError, InvalidCredentialsError } = require('../utils/errors/CustomError');

class CreateUser {
    async execute({ username, email, password }) {

        const checkExistingUser = await userRepository.getUserByEmail(email);
        if (checkExistingUser) {
            throw new UserAlreadyExistsError('User already exists');
        }

        if (password.length < 8) {
            throw new InvalidCredentialsError('Password must be at least 8 characters long');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userRepository.createUser({ username, email, password: hashedPassword });

        return user;
    }
}

module.exports = CreateUser;