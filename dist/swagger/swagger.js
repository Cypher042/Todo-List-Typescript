// @ts-ignore
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'SynGrow API',
        version: '1.0.0',
        description: 'API documentation for SynGrow task manager',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Local server',
        },
    ],
};
const options = {
    swaggerDefinition,
    apis: ['./src/routes/routes.ts'], // Path to the API docs
};
const swaggerSpec = swaggerJSDoc(options);
export { swaggerUi, swaggerSpec };
//# sourceMappingURL=swagger.js.map