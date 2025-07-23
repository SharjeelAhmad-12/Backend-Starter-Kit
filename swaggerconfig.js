const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "User Management API",
    version: "1.0.0",
    description: "API for managing user registration, login, password handling, and OTP verification.",
  },
  servers: [
    {
      url: "http://localhost:8000", // ✅ Your base URL
      description: "Local development server",
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
  apis: ["./routes/*.js", "./models/*.js"], // ✅ Include all routes/models with Swagger JSDoc comments
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsDoc(options);

// Function to set up Swagger docs
const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
