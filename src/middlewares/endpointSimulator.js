const { faker } = require('@faker-js/faker');
const endpointRepository = require('../repositories/endpoint.repository');

function generateFakerData(template) {
    try {
        return new Function('faker', `return ${template}`)(faker);
    } catch (err) {
        console.error(`Error processing Faker template: ${template}`, err);
        return null;
    }
}


function processResponse(response, pathParams = {}) {
    if (typeof response === 'object' && response !== null) {
        const processed = Array.isArray(response) ? [] : {};

        for (const [key, value] of Object.entries(response)) {
            processed[key] = processResponse(value, pathParams);
        }

        return processed;
    }

    if (typeof response === 'string' && response.startsWith(':')) {
        const paramName = response.slice(1);
        return pathParams[paramName] || null;
    }

    if (typeof response === 'string' && response.includes('faker.')) {
        return generateFakerData(response.trim());
    }

    return response;
}

async function endpointSimulator(req, res) {
    try {
        const { userId } = req.params;
        const fullPath = `/${req.params[0] || ''}`;
        const method = req.method.toUpperCase();
        const path_splitted = fullPath.trim().split('/').slice(1);
        const endpoints = await endpointRepository.getEndpoints(userId);

        let endpoint;
        let pathParams = {};

        if (endpoints && endpoints.length > 0) {
            for (const item of endpoints) {
                const endpointParts = item.path.trim().split('/').slice(1);

                const matchedParams = matchPath(path_splitted, endpointParts);
                if (matchedParams && item.method === method) {
                    endpoint = item;
                    pathParams = matchedParams;
                    break;
                }
            }

            if (endpoint) {
                console.log('Matched endpoint:', endpoint);
                console.log('Path parameters:', pathParams);
            } else {
                console.log('No matching endpoint found.');
            }
        } else {
            console.log('No endpoints found for user:', userId);
        }


        if (!endpoint) {
            return res.status(404).json({ error: 'Endpoint not found or inactive' });
        }

        if (!endpoint.isActive) {
            return res.status(403).json({ error: 'Endpoint is inactive' });
        }

        const { responseHeaders, responseBody, responseDelay, statusCode } = endpoint;

        if (responseHeaders) {
            const processedHeaders = processResponse(responseHeaders);
            for (const [key, value] of Object.entries(processedHeaders)) {
                res.setHeader(key, String(value));
            }
        }

        if (responseDelay) {
            await new Promise(resolve => setTimeout(resolve, responseDelay));
        }

        const processedBody = processResponse(responseBody || {}, pathParams);

        return res.status(statusCode || 200).json(processedBody);

    } catch (err) {
        console.error('Error in endpoint simulation:', err.message);
        return res.status(500).json({
            error: 'Internal server error',
            details: err.message
        });
    }
}


function matchPath(requestParts, endpointParts) {
    if (requestParts.length !== endpointParts.length) {
        return null;
    }

    const params = {};

    for (let i = 0; i < requestParts.length; i++) {
        const requestPart = requestParts[i];
        const endpointPart = endpointParts[i];

        if (endpointPart.startsWith(':')) {
            const paramName = endpointPart.slice(1);
            params[paramName] = requestPart;
            continue;
        }
        if (requestPart !== endpointPart) {
            return null;
        }
    }

    return params;
}

module.exports = endpointSimulator;