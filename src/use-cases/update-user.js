const userRepository = require('../repositories/user.repository');
const bcrypt = require('bcrypt');
const { InvalidCredentialsError, AuthenticationError } = require('../utils/errors/CustomError');

class UpdateUser {
    async execute({ _id, password, newPassword, newUsername }) {

        const user = await userRepository.getUserById(_id);

        if (!user) {
            throw new AuthenticationError('User does not exists');
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            throw new InvalidCredentialsError('Password given does not match');
        }

        let newPasswordHashed;

        if (newPassword) {

            if (newPassword.length < 8) {
                throw new InvalidCredentialsError('Password must be at least 8 characters long');
            }

            newPasswordHashed = await bcrypt.hash(newPassword, 10);

        }

        const updated = await userRepository.updateUser({ _id, password: newPasswordHashed, username: newUsername });

        return updated;
    }
}

module.exports = UpdateUser;