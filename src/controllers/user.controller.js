const CreateUser = require('../use-cases/create-user');
const DeleteUser = require('../use-cases/delete-user');

async function createUser(req, res) {
    try {
        const { username, email, password } = req.body;

        const createUser = new CreateUser();

        const { _id } = await createUser.execute({ username, email, password });

        return res.status(200).json({
            message: 'User created successfully',
            _id
        });

    } catch (err) {
        return res.status(500).json({ error: 'An error occurred while creating the user', details: err.message });
    }
}

async function deleteUser(req, res) {
    try {
        const _id = req.params._id;

        const deleteUser = new DeleteUser();

        const deleted = await deleteUser.execute(_id);

        return res.status(200).json({
            message: 'User deleted successfully',
            _id: deleted._id
        });

    } catch (err) {
        return res.status(500).json({ error: 'An error occurred while deleting the user', details: err.message });
    }
}

module.exports = {
    createUser,
    deleteUser
}