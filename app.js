// app.js - entry point
const express = require('express');
const hc_router = require('./src/routes/healthcheck.router.js');
const auth_router = require('./src/routes/auth.router.js');

const app = express();

//standard header settings on all API requests
app.use(express.json(), function(req, res, next) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.removeHeader('Connection');
    res.removeHeader('Keep-Alive');
    next();
});

//router for API Endpoint for health check
app.use('/healthz', hc_router);

//router for API Endpoints for authentication
app.use('/v1/user', auth_router);


//function for all other Endpoints
//returns standard 404 HTTP status code for unrecognised Endpoints
app.use('/', function(req, res) {
    console.error('ERROR: Endpoint not found')
    res.status(404).end();
});


const PORT = process.env.SERVER_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


module.exports = app;