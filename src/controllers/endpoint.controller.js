const CreateEndpoint = require('../use-cases/create-endpoint');

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

module.exports = {
    createEndpoint
}