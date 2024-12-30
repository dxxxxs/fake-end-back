class CustomError extends Error {
    constructor(message, statusCode, details) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }
}

class UserAlreadyExistsError extends CustomError {
    constructor(details) {
        super('User already exists', 409, details); // 409 Conflict
    }
}

class InvalidCredentialsError extends CustomError {
    constructor(details) {
        super('Invalid credentials', 401, details); // 401 Unauthorized
    }
}

class AuthenticationError extends CustomError {
    constructor(details) {
        super('Authentication failed', 403, details); // 403 Forbidden
    }
}

class EndpointNotFoundError extends CustomError {
    constructor(details) {
        super('Endpoint not found', 404, details); // 404 Not Found
    }
}

class EndpointInactiveError extends CustomError {
    constructor(details) {
        super('Endpoint is inactive', 403, details); // 403 Forbidden
    }
}

class InvalidEndpointDataError extends CustomError {
    constructor(details) {
        super('Invalid endpoint data', 400, details); // 400 Bad Request
    }
}

class DatabaseError extends CustomError {
    constructor(details) {
        super('Database error', 500, details); // 500 Internal Server Error
    }
}

class RateLimitError extends CustomError {
    constructor(details) {
        super('Too many requests', 429, details); // 429 Too Many Requests
    }
}

class TokenExpiredError extends Error {
    constructor(message) {
        super(message);
        this.name = 'TokenExpiredError';
        this.statusCode = 401; // Opcionalmente puedes usar 401 para indicar que el token expiró.
    }
}

class InvalidTokenError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidTokenError';
        this.statusCode = 403;
    }
}


module.exports = {
    CustomError,
    UserAlreadyExistsError,
    InvalidCredentialsError,
    AuthenticationError,
    EndpointNotFoundError,
    EndpointInactiveError,
    InvalidEndpointDataError,
    DatabaseError,
    RateLimitError,
    TokenExpiredError,
    InvalidTokenError
};