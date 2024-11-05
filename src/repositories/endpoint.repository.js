const getEndpointModel = require('../models/endpoint.model');

async function createEndpoint(userId, endpointData) {
    try {
        const EndpointModel = getEndpointModel(userId);

        const userEndpoints = await EndpointModel.findOneAndUpdate(
            {},
            { $push: { endpoints: endpointData } },
            { new: true, upsert: true }
        );

        return userEndpoints;

    } catch (err) {
        throw new Error(`Failed to create endpoint: ${err.message}`);
    }
}

async function deleteEndpoint(userId, endpointId) {
    try {
        const EndpointModel = getEndpointModel(userId);

        const result = await EndpointModel.findOneAndUpdate(
            {},
            { $pull: { endpoints: { _id: endpointId } } },
            { new: true }
        );

        if (!result) {
            throw new Error('Endpoint not found');
        }

        return result;

    } catch (err) {
        throw new Error(`Failed to delete endpoint: ${err.message}`);
    }
}

async function getEndpoints(userId) {
    try {
        const EndpointModel = getEndpointModel(userId);

        const userEndpoints = await EndpointModel.findOne({});

        return userEndpoints ? userEndpoints.endpoints : [];

    } catch (err) {
        throw new Error(`Failed to get endpoints: ${err.message}`);
    }
}

async function getEndpointByPathAndMethod(userId, path, method) {
    try {
        const EndpointModel = getEndpointModel(userId);

        const endpoint = await EndpointModel.findOne({
            'endpoints.path': path,
            'endpoints.method': method
        }, { 'endpoints.$': 1 });

        return endpoint ? endpoint.endpoints.find(ep => ep.path === path && ep.method === method) : null;

    } catch (err) {
        throw err;
    }
}

module.exports = {
    createEndpoint,
    deleteEndpoint,
    getEndpoints,
    getEndpointByPathAndMethod
}