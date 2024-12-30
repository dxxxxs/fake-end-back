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
        if (err instanceof CustomError) {
            return res.status(err.statusCode).json({ error: err.message, details: err.details });
        }
        console.error(err);
        return res.status(500).json({ error: 'An unexpected error occurred', details: err.message });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const login = new Login();

        const { user, token } = await login.execute({ email, password });

        res.setHeader('x-auth-token', token);
        return res.status(200).json({
            message: 'User logged in successfully',
            _id: user._id,
            username: user.username
        });

    } catch (err) {
        if (err instanceof CustomError) {
            return res.status(err.statusCode).json({ error: err.message, details: err.details });
        }
        console.error(err);
        return res.status(500).json({ error: 'An unexpected error occurred', details: err.message });
    }
}

module.exports = {
    register,
    login
}