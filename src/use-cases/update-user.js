const userRepository = require('../repositories/user.repository');
const bcrypt = require('bcrypt');

class UpdateUser {
    async execute({ _id, password, newPassword, newUsername }) {

        const user = await userRepository.getUserById(_id);

        if (!user) {
            throw new Error('User does not exists');
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            throw new Error('Password given does not match');
        }

        let newPasswordHashed;

        if (newPassword) {

            if (newPassword.length < 8) {
                throw new Error('Password must be at least 8 characters long');
            }

            newPasswordHashed = await bcrypt.hash(newPassword, 10);

        }

        const updated = await userRepository.updateUser({ _id, password: newPasswordHashed, username: newUsername });

        return updated;
    }
}

module.exports = UpdateUser;