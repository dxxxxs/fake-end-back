const userRepository = require('../repositories/user.repository');

class DeleteUser {
    async execute(_id) {

        const user = await userRepository.getUserById(_id);

        if (!user) {
            throw new Error('User does not exists');
        }

        const deleted = await userRepository.deleteUser(_id);

        return deleted;
    }
}

module.exports = DeleteUser;