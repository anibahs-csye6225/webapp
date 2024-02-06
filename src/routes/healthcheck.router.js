// healthcheck.router.js - router for heatlhz API Endpoint.
// ---------------------------------------------------------
// Use Cases:
// Call methods, other than GET should return 405
// Request body/query parameter should return 400
// GET call should return 200 if db connection succedes
// GET call should return 503 if db connection fails
// ---------------------------------------------------------

const express = require('express');
const router = express.Router();
const db = require('./../../database.js')


router.get('/:path', async (req, res) => {
    console.error("ERROR: Endpoint not found")
    res.status(404).end();
});

// check cases and return appropriate HTTP status code
router.use('/', async (req, res, next) => {
    console.log('Request: ', Object.keys(req.body).length, Object.keys(req.query).length, req.query)
    if(req.method == "GET"){
        if (Object.keys(req.body).length > 0 || Object.keys(req.query).length > 0 || Object.keys(req.params).length > 0 ) {
            // Payload detected, respond with 400 Bad Request
            console.error('ERROR: Request contains some payload: ', req.body, req.query)
            res.status(400).end();
        }
        else{
            // test database connection on demand and return 200 for suuceessfull connection
            // 503 for failed connection
            db.authenticate()
                .then((value) => {
                        console.log("Looks like we got through!",value);
                        res.status(200).end();
                })
                .catch((err) => {
                        console.error("Damn we still stuck! Exception:", err);
                        res.status(503).end();
                })
        }
    } else {
        // unexpected API method received in call, return 405 HTTP status code
        console.error("ERROR: API METHOD not allowed!")
        res.status(405).end();
    }
});


module.exports = router;