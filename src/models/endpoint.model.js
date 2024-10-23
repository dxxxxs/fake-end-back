const mongoose = require('mongoose');

const endpointSchema = new mongoose.Schema({
    body: { type: mongoose.Schema.Types.Mixed, required: true },
    headers: { type: mongoose.Schema.Types.Mixed, required: true },
    name: { type: String, required: true },
    path: { type: String, required: true },
    statusCode: { type: Number, required: true },
});

function getEndpointModel(userId) {
    const collectionName = `Endpoint_${userId}`;
    const model = mongoose.model(collectionName, endpointSchema, collectionName);
    return model;
}

module.exports = getEndpointModel;
