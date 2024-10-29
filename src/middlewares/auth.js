const jwt = require('jsonwebtoken');


const authMiddleware = async (req, res, next) => {
    try {
        const secret = process.env.JWT_SECRET;

        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(403).json({
                success: false,
                message: 'Not logged in'
            });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, secret);
        req.decoded = decoded;
        next();

    } catch (error) {
        res.status(403).json({
            success: false,
            message: error.message || 'Failed to authenticate token'
        });
    }
};

module.exports = authMiddleware;