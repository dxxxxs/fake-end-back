class EndpointValidator {
    validateEndpointData(endpointData) {
        if (!endpointData.name || !endpointData.path || !endpointData.method || endpointData.statusCode === undefined) {
            throw new Error('Missing required fields: name, path, method, or statusCode');
        }

        if (!this.#isString(endpointData.name) || !this.#isString(endpointData.path) || !this.#isString(endpointData.method)) {
            throw new Error('Endpoint name, path, and method must all be strings');
        }

        if (!this.#isNumber(endpointData.statusCode)) {
            throw new Error('Endpoint statusCode must be a number');
        }

        const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
        if (!allowedMethods.includes(endpointData.method.toUpperCase())) {
            throw new Error('Endpoint method must be a valid HTTP method');
        }

        if (endpointData.headers && !this.#isPlainObject(endpointData.headers)) {
            throw new Error('Endpoint headers must be a plain object');
        }

        if (endpointData.body && !this.#isPlainObject(endpointData.body)) {
            throw new Error('Endpoint body must be a plain object');
        }

        if (!/^\/[a-zA-Z0-9\-_/]*$/.test(endpointData.path)) {
            throw new Error('Endpoint path is not valid');
        }

        if (endpointData.statusCode < 100 || endpointData.statusCode > 599) {
            throw new Error('Endpoint statusCode must be a valid HTTP status code');
        }
    }

    #isString(data) {
        return typeof data === 'string';
    }

    #isNumber(data) {
        return typeof data === 'number';
    }

    #isPlainObject(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }
}

module.exports = EndpointValidator;