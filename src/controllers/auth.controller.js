const CreateUser = require('../use-cases/create-user');
const Login = require('../use-cases/login');

async function register(req, res) {
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

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const login = new Login();

        const { user, token } = await login.execute({ email, password });

        console.log(user, token);

        return res.status(200).json({
            message: 'User logged in successfully',
            _id: user._id,
            token
        });

    } catch (err) {
        return res.status(500).json({ error: 'An error occurred while login in', details: err.message });
    }
}

module.exports = {
    register,
    login
}