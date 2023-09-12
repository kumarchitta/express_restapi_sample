require('dotenv').config();

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Case Management REST API',
    description: 'API Documentation',
  },
  host: process.env.APISERVER+':9001',
  schemes: ['http'],
  basePath: '/api'
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./api.js']

swaggerAutogen(outputFile, endpointsFiles, doc);
