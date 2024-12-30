const endpointRepository = require('../repositories/endpoint.repository');
const { InvalidEndpointDataError, EndpointNotFoundError } = require('../utils/errors/CustomError');
const EndpointValidator = require('../utils/validators/endpointValidator');

class UpdateEndpoint {
    async execute({ userId, endpointId, endpointData }) {

        if (!endpointId) {
            throw new InvalidEndpointDataError('Endpoint ID is required');
        }

        if (!endpointData) {
            throw new InvalidEndpointDataError('Endpoint data is missing');
        }

        const endpointValidator = new EndpointValidator();

        endpointValidator.validateEndpointData(endpointData);

        const existingEndpoint = await endpointRepository.getEndpointById(userId, endpointId);

        if (!existingEndpoint) {
            throw new EndpointNotFoundError(`Endpoint does not exist on path: ${endpointData.path} and method: ${endpointData.method}`);
        }

        return await endpointRepository.updateEndpoint(userId, endpointId, endpointData);
    }
}

module.exports = UpdateEndpoint;