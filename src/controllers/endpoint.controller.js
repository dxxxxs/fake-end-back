const CreateEndpoint = require('../use-cases/create-endpoint');
const DeleteEndpoint = require('../use-cases/delete-endpoint');
const UpdateEndpoint = require('../use-cases/update-endpoint');
const GetAllEndpoints = require('../use-cases/get-all-endpoints');

async function createEndpoint(req, res) {
    try {
        const endpointData = req.body;

        const { _id } = req.decoded;

        const createEndpoint = new CreateEndpoint();

        const endpoint = await createEndpoint.execute({ userId: _id, endpointData });

        return res.status(200).json({
            message: 'Endpoint created successfully',
            data: endpoint
        });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'An error occurred while creating the endpoint', details: err.message });
    }
}

async function deleteEndpoint(req, res) {
    try {
        const endpointId = req.params.endpointId;
        const { _id } = req.decoded;

        const deleteEndpoint = new DeleteEndpoint();

        const endpoint = await deleteEndpoint.execute({ userId: _id, endpointId });

        return res.status(200).json({
            message: 'Endpoint deleted successfully',
            data: endpoint
        });

    } catch (err) {
        return res.status(500).json({ error: 'An error ocurred while deleting the endpoint', details: err.message });
    }
}

async function updateEndpoint(req, res) {
    try {
        const endpointId = req.params.endpointId;
        const { _id } = req.decoded;
        const { endpointData } = req.body;

        const updateEndpoint = new UpdateEndpoint();

        const endpoint = await updateEndpoint.execute({ userId: _id, endpointId, endpointData });

        return res.status(200).json({
            message: 'Endpoint updated successfully',
            data: endpoint
        });

    } catch (err) {
        return res.status(500).json({ error: 'An error ocurred while updating the endpoint', details: err.message });
    }
}

async function getEndpoints(req, res) {
    try {
        const { _id } = req.decoded;

        const getAllEndpoints = new GetAllEndpoints();

        const endpoints = await getAllEndpoints.execute(_id);

        return res.status(200).json({
            data: endpoints
        });

    } catch (err) {
        return res.status(500).json({ error: 'An error ocurred while getting the endpoints', details: err.message });
    }
}

module.exports = {
    createEndpoint,
    deleteEndpoint,
    updateEndpoint,
    getEndpoints
}