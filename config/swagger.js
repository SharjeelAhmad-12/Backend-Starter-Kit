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
      },
      "x-logo": {
        "url": "https://via.placeholder.com/200x50/667eea/ffffff?text=Backend+Starter+Kit",
        "backgroundColor": "#667eea"
      },
      "x-banner": {
        "title": "Backend Starter Kit API",
        "version": "1.0.0",
        "specification": "OAS 3.0",
        "description": "A comprehensive REST API with authentication, user management, and file upload capabilities"
      },
      "x-tagGroups": [
        {
          "name": "Authentication",
          "tags": ["Auth"]
        },
        {
          "name": "User Management",
          "tags": ["Users"]
        },
        {
          "name": "Security",
          "tags": ["OTP"]
        }
      ]
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
      schemas: {
        // Common Response Schema
        ApiResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              description: "Indicates if the request was successful"
            },
            message: {
              type: "string",
              description: "Response message"
            },
            data: {
              type: "object",
              description: "Response data (optional)"
            }
          }
        },
        // Error Response Schema
        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false
            },
            message: {
              type: "string",
              description: "Error message"
            },
            errors: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  field: {
                    type: "string"
                  },
                  message: {
                    type: "string"
                  }
                }
              }
            }
          }
        },
        // User Schema
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "User's unique identifier"
            },
            name: {
              type: "string",
              description: "User's full name"
            },
            email: {
              type: "string",
              format: "email",
              description: "User's email address"
            },
            role: {
              type: "string",
              enum: ["user", "admin"],
              description: "User's role"
            },
            isVerified: {
              type: "boolean",
              description: "Whether the user's email is verified"
            },
            profileImage: {
              type: "string",
              description: "URL to user's profile image"
            },
            phone: {
              type: "string",
              description: "User's phone number"
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Account creation timestamp"
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update timestamp"
            }
          }
        },
        // Login Response Schema
        LoginResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true
            },
            message: {
              type: "string",
              example: "Login Successful"
            },
            data: {
              type: "object",
              properties: {
                user: {
                  $ref: "#/components/schemas/User"
                },
                accessToken: {
                  type: "string",
                  description: "JWT access token"
                },
                refreshToken: {
                  type: "string",
                  description: "JWT refresh token"
                }
              }
            }
          }
        },
        // Pagination Schema
        Pagination: {
          type: "object",
          properties: {
            currentPage: {
              type: "integer",
              description: "Current page number"
            },
            totalPages: {
              type: "integer",
              description: "Total number of pages"
            },
            totalItems: {
              type: "integer",
              description: "Total number of items"
            },
            itemsPerPage: {
              type: "integer",
              description: "Number of items per page"
            }
          }
        },
        // File Upload Response Schema
        FileUploadResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true
            },
            message: {
              type: "string",
              example: "File uploaded successfully"
            },
            data: {
              type: "object",
              properties: {
                filename: {
                  type: "string",
                  description: "Original filename"
                },
                url: {
                  type: "string",
                  description: "Public URL of uploaded file"
                },
                publicId: {
                  type: "string",
                  description: "Cloudinary public ID"
                },
                size: {
                  type: "integer",
                  description: "File size in bytes"
                },
                format: {
                  type: "string",
                  description: "File format"
                },
                width: {
                  type: "integer",
                  description: "Image width (if applicable)"
                },
                height: {
                  type: "integer",
                  description: "Image height (if applicable)"
                }
              }
            }
          }
        }
      },
      parameters: {
        // Common Parameters
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
  const customSiteTitle = "Backend Starter Kit API Documentation";
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
    
    /* API Info Badge */
    .api-info-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(255, 255, 255, 0.2);
      padding: 0.4rem 0.8rem;
      border-radius: 20px;
      font-size: 0.8rem;
      margin-bottom: 1rem;
    }
    
    .api-info-badge .version {
      font-weight: 600;
    }
    
    .api-info-badge .oas {
      background: rgba(255, 255, 255, 0.3);
      padding: 0.2rem 0.5rem;
      border-radius: 10px;
      font-size: 0.7rem;
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

  const customHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${customSiteTitle}</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico">
        <style>
            ${customCss}
            
            /* Custom Banner */
            .api-banner {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 2rem;
                margin: 0;
                text-align: center;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            
            .api-banner h1 {
                font-size: 2.5rem;
                font-weight: 700;
                margin: 0 0 0.5rem 0;
                color: white;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            }
            
            .api-banner .version-badge {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                background: rgba(255, 255, 255, 0.2);
                padding: 0.4rem 0.8rem;
                border-radius: 20px;
                font-size: 0.9rem;
                margin-bottom: 1rem;
            }
            
            .api-banner .version-badge .version {
                font-weight: 600;
            }
            
            .api-banner .version-badge .oas {
                background: rgba(255, 255, 255, 0.3);
                padding: 0.2rem 0.5rem;
                border-radius: 10px;
                font-size: 0.7rem;
            }
            
            .api-banner .description {
                font-size: 1.1rem;
                line-height: 1.6;
                margin-bottom: 1.5rem;
                color: rgba(255, 255, 255, 0.9);
                max-width: 800px;
                margin-left: auto;
                margin-right: auto;
            }
            
            .api-banner .contact-info {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 1rem;
                margin-bottom: 1rem;
                flex-wrap: wrap;
            }
            
            .api-banner .contact-info a {
                color: white;
                text-decoration: none;
                padding: 0.5rem 1rem;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 25px;
                font-size: 0.9rem;
                transition: all 0.3s ease;
            }
            
            .api-banner .contact-info a:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: translateY(-2px);
            }
            
            .api-banner .license {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 0.5rem;
            }
            
            .api-banner .license a {
                color: white;
                text-decoration: none;
                padding: 0.3rem 0.8rem;
                background: rgba(255, 255, 255, 0.15);
                border-radius: 15px;
                font-size: 0.8rem;
                transition: all 0.3s ease;
            }
            
            .api-banner .license a:hover {
                background: rgba(255, 255, 255, 0.25);
            }
            
            @media (max-width: 768px) {
                .api-banner h1 {
                    font-size: 2rem;
                }
                
                .api-banner .contact-info {
                    flex-direction: column;
                    gap: 0.5rem;
                }
            }
        </style>
    </head>
    <body>
        <div class="api-banner">
            <h1>Backend Starter Kit API</h1>
            <div class="version-badge">
                <span class="version">1.0.0</span>
                <span class="oas">OAS 3.0</span>
            </div>
            <p class="description">
                A comprehensive REST API with authentication, user management, and file upload capabilities
            </p>
            <div class="contact-info">
                <a href="mailto:support@example.com">Contact API Support</a>
            </div>
            <div class="license">
                <a href="https://opensource.org/licenses/MIT" target="_blank">MIT</a>
            </div>
        </div>
    </body>
    </html>
  `;

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: customCss,
    customSiteTitle: customSiteTitle,
    customfavIcon: "/favicon.ico",
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
