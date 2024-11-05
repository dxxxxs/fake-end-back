const endpointRepository = require('../repositories/endpoint.repository');
const EndpointValidator = require('../utils/validators/endpointValidator');

class CreateEndpoint {
    async execute({ userId, endpointData }) {

        if (!endpointData) {
            throw new Error('Endpoint data is missing');
        }

        const endpointValidator = new EndpointValidator();

        endpointValidator.validateEndpointData(endpointData);

        const existingEndpoint = await endpointRepository.getEndpointByPathAndMethod(userId, endpointData.path, endpointData.method);

        if (existingEndpoint) {
            throw new Error(`An endpoint already exist on path: ${endpointData.path} and method: ${endpointData.method}`);
        }

        return await endpointRepository.createEndpoint(userId, endpointData);


    }
}

module.exports = CreateEndpoint;