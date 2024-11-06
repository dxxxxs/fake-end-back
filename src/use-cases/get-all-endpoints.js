const endpointRepository = require('../repositories/endpoint.repository');

class GetAllEndpoints {
    async execute(userId) {
        return await endpointRepository.getEndpoints(userId);
    }
}

module.exports = GetAllEndpoints;