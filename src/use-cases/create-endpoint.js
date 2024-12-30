const endpointRepository = require('../repositories/endpoint.repository');
const EndpointValidator = require('../utils/validators/endpointValidator');
const { InvalidEndpointDataError, EndpointNotFoundError } = require('../utils/errors/CustomError');
class CreateEndpoint {
    async execute({ userId, endpointData }) {

        if (!endpointData) {
            throw new InvalidEndpointDataError('Endpoint data is missing');
        }

        const endpointValidator = new EndpointValidator();

        endpointValidator.validateEndpointData(endpointData);

        const existingEndpoint = await endpointRepository.getEndpointByPathAndMethod(userId, endpointData.path, endpointData.method);

        if (existingEndpoint) {
            throw new EndpointNotFoundError(`An endpoint already exist on path: ${endpointData.path} and method: ${endpointData.method}`);
        }

        return await endpointRepository.createEndpoint(userId, endpointData);

    }
}

module.exports = CreateEndpoint;