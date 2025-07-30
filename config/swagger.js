const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Backend Starter Kit API",
      version: "1.0.0",
      description: "A comprehensive REST API with authentication, user management, and file upload capabilities",
      contact: {
        name: "API Support",
        email: "support@example.com",
        url: "mailto:support@example.com"
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT"
      }
    },
    servers: [
      {
        url: "http://localhost:8000",
        description: "Development server"
      },
      {
        url: "https://api.example.com",
        description: "Production server"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "JWT token obtained from login endpoint"
        }
      },
      parameters: {
        pageParam: {
          name: "page",
          in: "query",
          description: "Page number for pagination",
          required: false,
          schema: {
            type: "integer",
            minimum: 1,
            default: 1
          }
        },
        limitParam: {
          name: "limit",
          in: "query",
          description: "Number of items per page",
          required: false,
          schema: {
            type: "integer",
            minimum: 1,
            maximum: 100,
            default: 10
          }
        },
        searchParam: {
          name: "search",
          in: "query",
          description: "Search term for filtering results",
          required: false,
          schema: {
            type: "string"
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ],
    tags: [
      {
        name: "Auth",
        description: "Authentication and authorization endpoints"
      },
      {
        name: "Users",
        description: "User profile and management operations"
      },
      {
        name: "OTP",
        description: "One-time password verification and management"
      }
    ]
  },
  apis: [
    "./routes/*.js",
    "./docs/*.js",
    "./models/*.js",
    "./docs/api-schemas.js"
  ],
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  const customCss = `
    .swagger-ui .topbar { display: none }
    
    /* Custom Banner Styles */
    .swagger-ui .info {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 2rem;
      margin: -1rem -1rem 2rem -1rem;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .swagger-ui .info .title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: white;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
    
    .swagger-ui .info .title small {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      font-size: 0.8rem;
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      margin-left: 1rem;
      font-weight: 500;
    }
    
    .swagger-ui .info .description {
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
      color: rgba(255, 255, 255, 0.9);
    }
    
    .swagger-ui .info .contact {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    
    .swagger-ui .info .contact a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 25px;
      font-size: 0.9rem;
      transition: all 0.3s ease;
    }
    
    .swagger-ui .info .contact a:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }
    
    .swagger-ui .info .license {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .swagger-ui .info .license a {
      color: white;
      text-decoration: none;
      padding: 0.3rem 0.8rem;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 15px;
      font-size: 0.8rem;
      transition: all 0.3s ease;
    }
    
    .swagger-ui .info .license a:hover {
      background: rgba(255, 255, 255, 0.25);
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
      .swagger-ui .info .title {
        font-size: 2rem;
      }
      
      .swagger-ui .info .contact {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
    }
  `;

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: customCss,
    customSiteTitle: "Backend Starter Kit API Documentation",
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      deepLinking: true,
      tryItOutEnabled: true
    }
  }));
};

module.exports = setupSwagger;
