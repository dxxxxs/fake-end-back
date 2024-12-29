const jwt = require('jsonwebtoken');
const GenerateToken = require('../use-cases/generate-token');

const authMiddleware = async (req, res, next) => {
    try {
        const secret = process.env.JWT_SECRET;
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(403).json({
                success: false,
                message: 'Not logged in',
            });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, secret);

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
    } catch (error) {
        res.status(403).json({
            success: false,
            message: error.message || 'Failed to authenticate token',
        });
    }
};

module.exports = authMiddleware;
