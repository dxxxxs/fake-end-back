const endpointRepository = require('../repositories/endpoint.repository');

class DeleteEndpoint {
    async execute({ userId, endpointId }) {

        if (!endpointId) {
            throw new Error('Endpoint ID is required');
        }

        return await endpointRepository.deleteEndpoint(userId, endpointId);
    }
}

module.exports = DeleteEndpoint;