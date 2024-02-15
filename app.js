// app.js - entry point

const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
const express = require('express');

const hc_router = require('./src/routes/healthcheck.router.js');
const auth_router = require('./src/routes/auth.router.js');
const db = require('./database.js');

const app = express();
//dotenv.config({ path: '.env' });

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

async function initializeDatabase() {
    try {
        console.log('Loaded environment variable for dialect at the start:', process.env.DIALECT);
        await db.sync()
            .then((value) => {
                console.log("Database connection established!");
            })
            .catch((err) => {
                console.error("Database connection Failed: ", err);
            })
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}

// Initialize database before starting the server
initializeDatabase()
    .then(() => {
        // Start the server
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    });


module.exports = app;
