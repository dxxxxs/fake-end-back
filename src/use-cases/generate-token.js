const jwt = require('jsonwebtoken');

class GenerateToken {
    async execute({ user_id, username, email }) {
        const secret = process.env.JWT_SECRET;

        const token = jwt.sign(
            {
                _id: user_id,
                username: username,
                email: email
            },
            secret,
            {
                expiresIn: '5h'
            }
        );

        return token;
    }
}

module.exports = GenerateToken;