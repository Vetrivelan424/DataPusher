const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Data Pusher API',
        version: '1.0.0',
        description: 'API documentation for Data Pusher',
    },
    servers: [
        {
            url: 'http://localhost:3000',
        },
    ],
};

// Options for swagger-jsdoc
const options = {
    swaggerDefinition,
    // Path to the API docs
    apis: ['./routes/*.js'],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
