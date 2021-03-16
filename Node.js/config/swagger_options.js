import swaggerJsdoc from "swagger-jsdoc";

const options = {
    swaggerDefinition: {
            host: 'localhost:3000',
            basePath: '/',
            openapi: "3.0.0",
            info: {
                title: "GoStyle API with Swagger Doc",
                version: "0.1.0",
                description:
                    "This API is created for the GoStyle Mobile App and is documented with Swagger",
                license: {
                    name: "MIT",
                    url: "https://spdx.org/licenses/MIT.html",
                },
                contact: {
                    name: "GoStyle Team",
                    url: "https://logrocket.com",
                    email: "info@email.com",
                },
            },
            servers: [
                {
                    url: "http://localhost/docs",
                    description: "My API Documentation",
                },
            ],
        },
    apis: ['./src/routes*.js'],
};

const swaggerSpecification = await swaggerJsdoc(options);
export default swaggerSpecification
