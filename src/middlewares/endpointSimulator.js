const { faker } = require('@faker-js/faker');
const { pathToRegexp, match } = require('path-to-regexp');
const parseurl = require('parseurl');
const endpointRepository = require('../repositories/endpoint.repository');

function generateFakerData(template) {
    if (!/^faker\.\w+/.test(template.trim())) {
        console.error('Invalid Faker template:', template);
        return null;
    }
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
        if (typeof pathParams[paramName] === 'undefined') {
            console.warn(`Missing path parameter: ${paramName}`);
            return null;
        }
        return pathParams[paramName];
    }

    if (typeof response === 'string' && response.includes('faker.')) {
        return generateFakerData(response.trim());
    }

    return response;
}

async function endpointSimulator(req, res) {
    try {
        const { userId } = req.params;
        const parsedUrl = parseurl(req);
        const fullPath = parsedUrl.pathname.replace(`/${userId}`, '');
        const method = req.method.toUpperCase();

        const endpoints = await endpointRepository.getEndpoints(userId);

        if (!endpoints || endpoints.length === 0) {
            console.log('No endpoints found for user:', userId);
            return res.status(404).json({ error: 'No endpoints configured' });
        }

        let pathParams = {};

        const matchedEndpoint = endpoints.find(endpoint => {
            const matchFn = match(endpoint.path, { decode: decodeURIComponent });
            const matched = matchFn(fullPath);
            if (matched && endpoint.method === method) {
                pathParams = matched.params;
                return true;
            }
            return false;
        });

        if (!matchedEndpoint) {
            return res.status(404).json({ error: 'Endpoint not found or inactive' });
        }

        if (!matchedEndpoint.isActive) {
            return res.status(403).json({ error: 'Endpoint is inactive' });
        }

        const { responseHeaders, responseBody, responseDelay, statusCode } = matchedEndpoint;

        if (responseHeaders) {
            const processedHeaders = processResponse(responseHeaders);
            for (const [key, value] of Object.entries(processedHeaders)) {
                res.setHeader(key, String(value));
            }
        }

        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        if (responseDelay) await delay(responseDelay);


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

module.exports = endpointSimulator;
