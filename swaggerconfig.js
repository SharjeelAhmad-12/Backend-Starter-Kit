const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "User Management API",
    version: "1.0.0",
    description: "API for managing users and OTP verification",
  },
  servers: [
    {
      url: "http://localhost:8000", // ✅ Keep as base URL
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

// Options for swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: ["./routes/*.js", "./models/*.js"], // ✅ Your route/model doc comments
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsDoc(options);

// Function to setup Swagger
const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
