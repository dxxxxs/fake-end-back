const CreateEndpoint = require('../use-cases/create-endpoint');
const DeleteEndpoint = require('../use-cases/delete-endpoint');

async function createEndpoint(req, res) {
    try {
        const { endpointData } = req.body;
        const { _id } = req.decoded;

        const createEndpoint = new CreateEndpoint();

        const endpoints = await createEndpoint.execute({ userId: _id, endpointData });

        return res.status(200).json({
            message: 'Endpoint created successfully',
            data: endpoints
        });

    } catch (err) {
        return res.status(500).json({ error: 'An error occurred while creating the endpoint', details: err.message });
    }
}

async function deleteEndpoint(req, res) {
    try {
        const endpointId = req.params.endpointId;
        const { _id } = req.decoded;

        const deleteEndpoint = new DeleteEndpoint();

        const endpoints = await deleteEndpoint.execute({ userId: _id, endpointId });

        return res.status(200).json({
            message: 'Endpoint deleted successfully',
            data: endpoints
        })
    } catch (err) {
        return res.status(500).json({ error: 'An error ocurred while deleting the endpoint', details: err.message });
    }
}

module.exports = {
    createEndpoint,
    deleteEndpoint
}