const mongoose = require('mongoose');

const endpointSchema = new mongoose.Schema({
    body: { type: mongoose.Schema.Types.Mixed, required: false },
    headers: { type: mongoose.Schema.Types.Mixed, required: false },
    name: { type: String, required: true },
    path: { type: String, required: true },
    method: { type: String, enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], required: true },
    statusCode: { type: Number, required: true },
    queryParams: { type: mongoose.Schema.Types.Mixed, required: false },
    description: { type: String, required: false },
    isActive: { type: Boolean, default: true },
    responseDelay: { type: Number, required: false },
}, { timestamps: true });

const endpointCollectionSchema = new mongoose.Schema({
    endpoints: { type: [endpointSchema], default: [] }
})

function getEndpointModel(userId) {
    const collectionName = `EndpointCollection_${userId}`;
    if (mongoose.models[collectionName]) {
        return mongoose.models[collectionName];
    }
    return mongoose.model(collectionName, endpointCollectionSchema, collectionName);
}

module.exports = getEndpointModel;