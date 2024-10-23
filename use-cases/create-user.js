const userRepository = require('../repositories/user.repository');
const bcrypt = require('bcrypt');

class CreateUser {
    async execute({ username, email, password }) {

        const checkExistingUser = await userRepository.getUserByEmail(email);
        if (checkExistingUser) {
            throw new Error('User already exists');
        }

        if (password.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userRepository.createUser({ username, email, password: hashedPassword });

        return user;
    }
}

module.exports = CreateUser;