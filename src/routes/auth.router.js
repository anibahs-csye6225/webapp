// auth.router.js - router for authentication API Endpoint.
// ---------------------------------------------------------
// Use Cases:
// /v1/user
// GET /v1/user/self
// PUT /v1/user/self
// ---------------------------------------------------------




const Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const validator = require("email-validator");
const User = require('./../models/user.js');




//GET
router.get('/self', async (req, res, next) => {
    console.log("Authorization header: ", req.headers.authorization)
    if (Object.keys(req.body).length > 0 || Object.keys(req.query).length > 0 || Object.keys(req.params).length > 0 ) {
        // Payload found, respond with 400 Bad Request
        console.error('ERROR: Payload found')
        res.status(400).end();
    }else {
        if ( req.headers.authorization ) {
            //check base64
            if(req.headers.authorization.split(' ')[0]==='Basic'){
                var auth = new Buffer(req.headers.authorization.split(' ')[1], 'base64').toString().split(':');
                var requestedUsername = auth[0];
                var password = auth[1];
                selfUser = User.findOne({
                    where: {
                        username: requestedUsername
                    }
                }).then((value) => {
                    var selfUser = value
                    bcrypt.compare(password, selfUser.dataValues.password, (err, data) => {
                        if (err) {
                            console.error('ERROR: Unauthorized',err)
                            res.status(401).end();
                        } else if (value) {
                            var userValue = value.dataValues
                            delete userValue['password'];
                            console.log("GET returns Body: ",JSON.stringify(userValue, null, 2))
                            res.status(200).end(JSON.stringify(userValue, null, 2));
                        }
                    });
                }).catch((err) => {
                    console.error("ERROR Unable to find data:", err);
                    res.status(400).end();
                });
            }
        }
        else{
            // Header not found, respond with 400 Bad Request
            console.error('ERROR: No Authorization Header found')
            res.status(400).end();
        }
    }
});



//put
router.put('/self', async (req, res, next) => {
    if ( req.headers.authorization && Object.keys(req.body).length > 0 ) {
        if((req.body.account_created && Object.keys(req.body.account_created).length>0) ||
                (req.body.account_updated && Object.keys(req.body.account_updated).length>0) ||
                    (req.body.username && Object.keys(req.body.username).length>0)){
            console.error("ERROR: Unwanted payload");
            return res.status(400).end();
        }
        var auth = new Buffer(req.headers.authorization.split(' ')[1], 'base64').toString().split(':');
        var requestedUsername = auth[0];
        var password = auth[1];
        selfUser = User.findOne({
            where: {
                username: requestedUsername
            }
        }).then((value) => {
                var selfUser = value
                bcrypt.compare(password, selfUser.dataValues.password, (err, data) => {
                    if (err) {
                        console.log('ERROR: Unauthorized',err)
                        res.status(401).end();
                    }else if (value) {
                        var updateAtt = req.body;
                        updateAtt.account_updated = new Date()
                        console.log('updateAtt ', updateAtt)
                        User.update(req.body, {
                            where: {
                                username: requestedUsername
                            }
                        })
                            .then((value) => {
                                console.log("Updated user entry!", value);
                                res.status(204).end();
                            })
                            .catch((err) => {
                                console.error("ERROR: ", err);
                                res.status(400).end();
                            });
                } else {
                    console.error('ERROR Unable to find payload:!')
                    res.status(400).end();
                }
            });
        }).catch((err) => {
            console.error("ERROR: ", err);
            res.status(400).end();
        });
    }
    else{
        // Payload not found, respond with 400 Bad Request
        console.error('ERROR: No Authorization Header found')
        res.status(400).end();
    }
});



//other
router.use('/self', async (req, res, next) => {
    // unexpected API method received in call, return 405 HTTP status code
    console.error("ERROR: API METHOD not allowed!")
    res.status(405).end();
});



// handles POST API to create user
router.post('/', async (req, res, next) => {
    if (Object.keys(req.body).length > 0 || Object.keys(req.query).length > 0 || Object.keys(req.params).length > 0) {
        const data = req.body
        if(validator.validate(data.username) && data.password && Object.keys(req.body.password).length>0) {
            User.create({
                username: data.username, password: bcrypt.hashSync(data.password, bcrypt.genSaltSync(8)),
                first_name: data.first_name, last_name: data.last_name
            })
                .then((value) => {
                    console.log("Data entry completed! ID: ", value.id);
                    res.status(201).end();
                })
                .catch((err) => {
                    console.error("Data entry failed! Exception:", err);
                    res.status(400).end();
                });
        }else{
            // Payload not found, respond with 400 Bad Request
            console.error('ERROR: Bad Email address/password')
            res.status(400).end();
        }
    } else {
        // Payload not found, respond with 400 Bad Request
        console.error('ERROR: No payload found')
        res.status(400).end();
    }
});

router.use('/', async (req, res, next) => {
    // unexpected API method received in call, return 405 HTTP status code
    console.error("ERROR: API METHOD not allowed!")
    res.status(405).end();
});


module.exports = router;