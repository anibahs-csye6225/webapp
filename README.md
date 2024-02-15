# Webapp



The aim of this exercise is to perform a health check on a dummy web application called finance management. 
It contains one RESTful API to detect if the database connection is working.
The REST API is a GET method request, it does not accept payload, and will response with the following HTTP status codes -

- The application expects a GET call at /healthz and returns 200 OK HTTP status code if it is able to make a successful database connection.
- If db connection fails it returns a 503 Service Unavailable HTTP status code.
- If it receives payload with the call, it returns 400 Bad Request HTTP status code.
- If it receives other method calls, it will return 405 Method Not Allowed HTTP status code.
- If it receives calls to unrecognized endpoints, it will return 404 Not Found HTTP status code.
- POST /v1/user with JSON payload should create user
- GET /v1/user/self should return user details based on authorization header 
- PUT /v1/user/self should update user details

## Technology:
- Node.js
- Dependencies - Sequelize, Express, dotenv, pg, bcrypt, email-validator, jest, supertest
- Postgres 16
- PgAdmin


## References:

- https://stackoverflow.com/questions/31661449/express-js-how-to-set-a-header-to-all-responses
- https://sequelize.org/api/v6/class/src/sequelize.js~sequelize#instance-constructor-constructor
- https://expressjs.com/en/4x/api.html#router.METHOD
- https://blog.logrocket.com/organizing-express-js-project-structure-better-productivity/
- https://www.youtube.com/watch?v=iM_S4RczozU
- https://stackoverflow.com/questions/5951552/basic-http-authentication-in-node-js
- https://stackoverflow.com/questions/24000580/how-does-req-headers-authorization-get-set




