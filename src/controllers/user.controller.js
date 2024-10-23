const CreateUser = require('../use-cases/create-user');

async function createUser(req, res) {
    try {
        const { username, email, password } = req.body;

        const createUser = new CreateUser();

        const user = await createUser.execute({ username, email, password });

        return res.status(200).json({
            message: 'User created successfully',
            user: user
        });

    } catch (err) {
        return res.status(500).json({ error: 'An error occurred while creating the user', details: err.message });
    }
}

module.exports = {
    createUser
}