const getEndpointModel = require('../models/endpoint.model');
const {
    DatabaseError,
    EndpointNotFoundError,
    InvalidEndpointDataError
} = require('../utils/errors/CustomError');

async function createEndpoint(userId, endpointData) {
    try {
        const EndpointModel = getEndpointModel(userId);

        const newEndpoint = new EndpointModel(endpointData);

        await newEndpoint.save();

        return newEndpoint;
    } catch (err) {
        throw new DatabaseError(`Failed to create endpoint: ${err.message}`);
    }
}

async function deleteEndpoint(userId, endpointId) {
    try {
        const EndpointModel = getEndpointModel(userId);

        const result = await EndpointModel.findByIdAndDelete(endpointId);

        if (!result) {
            throw new EndpointNotFoundError(`Endpoint with ID ${endpointId} not found`);
        }

        return result;
    } catch (err) {
        if (err instanceof EndpointNotFoundError) throw err;
        throw new DatabaseError(`Failed to delete endpoint: ${err.message}`);
    }
}

async function getEndpoints(userId) {
    try {
        const EndpointModel = getEndpointModel(userId);

        const userEndpoints = await EndpointModel.find({});

        return userEndpoints;
    } catch (err) {
        throw new DatabaseError(`Failed to get endpoints: ${err.message}`);
    }
}

async function getEndpointByPathAndMethod(userId, path, method) {
    try {
        const EndpointModel = getEndpointModel(userId);

        const endpoint = await EndpointModel.findOne({ path, method });

        return endpoint;
    } catch (err) {
        throw new DatabaseError(`Failed to find endpoint by path and method: ${err.message}`);
    }
}

async function getEndpointById(userId, endpointId) {
    try {
        const EndpointModel = getEndpointModel(userId);

        const endpoint = await EndpointModel.findById(endpointId);

        if (!endpoint) {
            throw new EndpointNotFoundError(`Endpoint with ID ${endpointId} not found`);
        }

        return endpoint;
    } catch (err) {
        if (err instanceof EndpointNotFoundError) throw err;
        throw new DatabaseError(`Failed to find endpoint by _id: ${err.message}`);
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
            throw new EndpointNotFoundError(`Endpoint with ID ${endpointId} not found`);
        }

        return updatedEndpoint;
    } catch (err) {
        if (err instanceof EndpointNotFoundError) throw err;
        throw new DatabaseError(`Failed to update endpoint: ${err.message}`);
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
