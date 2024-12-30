const endpointRepository = require('../repositories/endpoint.repository');
const { InvalidEndpointDataError } = require('../utils/errors/CustomError');

class DeleteEndpoint {
    async execute({ userId, endpointId }) {

        if (!endpointId) {
            throw new InvalidEndpointDataError('Endpoint ID is required');
        }

        return await endpointRepository.deleteEndpoint(userId, endpointId);
    }
}

module.exports = DeleteEndpoint;