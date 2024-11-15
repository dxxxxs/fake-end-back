const getEndpointModel = require('../models/endpoint.model');

async function createEndpoint(userId, endpointData) {
    try {
        const EndpointModel = getEndpointModel(userId);

        const newEndpoint = new EndpointModel(endpointData);

        await newEndpoint.save();

        return newEndpoint;

    } catch (err) {
        throw new Error(`Failed to create endpoint: ${err.message}`);
    }
}

async function deleteEndpoint(userId, endpointId) {
    try {
        const EndpointModel = getEndpointModel(userId);

        const result = await EndpointModel.findByIdAndDelete(endpointId);

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

        const userEndpoints = await EndpointModel.find({});

        return userEndpoints;

    } catch (err) {
        throw new Error(`Failed to get endpoints: ${err.message}`);
    }
}

async function getEndpointByPathAndMethod(userId, path, method) {
    try {
        const EndpointModel = getEndpointModel(userId);

        const endpoint = await EndpointModel.findOne({ path, method });

        return endpoint;

    } catch (err) {
        throw new Error(`Failed to find endpoint by path and method: ${err.message}`);
    }
}

async function getEndpointById(userId, endpointId) {
    try {
        const EndpointModel = getEndpointModel(userId);

        const endpoint = await EndpointModel.findById(endpointId);

        return endpoint;

    } catch (err) {
        throw new Error(`Failed to find endpoint by _id: ${err.message}`);
    }
}

async function updateEndpoint(userId, endpointId, updateData) {
    try {
        const EndpointModel = getEndpointModel(userId);

        const updatedEndpoint = await EndpointModel.findByIdAndUpdate(
            endpointId,
            { $set: updateData },
            { new: true }
        );

        if (!updatedEndpoint) {
            throw new Error('Endpoint not found');
        }

        return updatedEndpoint;

    } catch (err) {
        throw new Error(`Failed to update endpoint: ${err.message}`);
    }
}

module.exports = {
    createEndpoint,
    deleteEndpoint,
    getEndpoints,
    getEndpointByPathAndMethod,
    updateEndpoint,
    getEndpointById
};
