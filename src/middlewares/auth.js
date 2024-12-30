const jwt = require('jsonwebtoken');
const GenerateToken = require('../use-cases/generate-token');
const {
    TokenExpiredError,
    InvalidTokenError,
    AuthenticationError
} = require('../utils/errors/CustomError');

const authMiddleware = async (req, res, next) => {
    try {
        const secret = process.env.JWT_SECRET;
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AuthenticationError('Authorization header missing or malformed');
        }

        const token = authHeader.split(' ')[1];
        let decoded;

        try {
            decoded = jwt.verify(token, secret);
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                throw new TokenExpiredError('Token has expired');
            } else {
                throw new InvalidTokenError('Invalid token');
            }
        }

        const now = Math.floor(Date.now() / 1000);
        const timeLeft = decoded.exp - now;
        const renewalThreshold = 20 * 60; // Renovar si quedan menos de 20 minutos

        if (timeLeft < renewalThreshold) {
            const generateToken = new GenerateToken();
            const newToken = await generateToken.execute({
                user_id: decoded._id,
                username: decoded.username,
                email: decoded.email
            });

            res.setHeader('x-auth-token', newToken);
        }

        req.decoded = decoded;
        next();
    } catch (err) {
        if (err instanceof CustomError) {
            return res.status(err.statusCode).json({ error: err.message, details: err.details });
        }
        return res.status(403).json({
            success: false,
            message: err.message || 'Failed to authenticate token',
        });
    }
};

module.exports = authMiddleware;
