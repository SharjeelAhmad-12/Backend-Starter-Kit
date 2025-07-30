# API Documentation

This project uses Swagger/OpenAPI 3.0 for comprehensive API documentation. The documentation follows industry best practices and provides detailed information about all endpoints, request/response schemas, and error handling.

## 📚 Documentation Structure

### Configuration
- **`config/swagger.js`**: Main Swagger configuration with schemas, security definitions, and UI customization
- **`docs/`**: Directory containing all Swagger documentation files

### Documentation Files
- **`docs/authSwagger.js`**: Authentication endpoints (signup, login, password management)
- **`docs/userSwagger.js`**: User profile and management operations
- **`docs/otpSwagger.js`**: OTP verification and resend functionality

## 🚀 Accessing Documentation

Once the server is running, you can access the API documentation at:
```
http://localhost:8000/api-docs
```

## 📋 API Overview

### Authentication (`/api/auth`)
- **POST** `/signup` - Register a new user
- **POST** `/login` - Authenticate user and get access token
- **POST** `/forgot-password` - Request password reset OTP
- **POST** `/reset-password` - Reset password using OTP
- **PUT** `/change-password` - Change user password (authenticated)
- **POST** `/refresh-token` - Refresh access token
- **POST** `/logout` - Logout user

### Users (`/api/users`)
- **GET** `/profile` - Get current user's profile
- **PUT** `/profile` - Update current user's profile
- **DELETE** `/profile` - Delete current user's profile
- **GET** `/search` - Search and filter users (admin only)
- **POST** `/upload-file` - Upload file to Cloudinary

### OTP (`/api/otp`)
- **POST** `/verify` - Verify user's OTP
- **POST** `/resend` - Resend OTP to user's email

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Most endpoints require a valid Bearer token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 📊 Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Specific error message"
    }
  ]
}
```

## 🏗️ Schema Definitions

### Common Schemas
- **`ApiResponse`**: Standard success response format
- **`ErrorResponse`**: Standard error response format
- **`User`**: Complete user object schema
- **`Pagination`**: Pagination metadata
- **`FileUploadResponse`**: File upload response format

### Request Schemas
- **`RegisterRequest`**: User registration data
- **`LoginRequest`**: User login credentials
- **`UpdateProfileRequest`**: Profile update data
- **`VerifyOTPRequest`**: OTP verification data

## 🔍 Features

### Interactive Documentation
- **Try It Out**: Test endpoints directly from the documentation
- **Request/Response Examples**: Pre-filled examples for all endpoints
- **Schema Validation**: Real-time validation of request data
- **Response Visualization**: Clear display of response structures

### Security
- **Bearer Token Authentication**: JWT-based authentication
- **Role-based Access**: Admin and user role support
- **Rate Limiting**: OTP request rate limiting
- **Input Validation**: Comprehensive request validation

### File Upload
- **Cloudinary Integration**: Secure file storage
- **Multiple Formats**: Support for images, videos, documents
- **Size Limits**: Configurable file size restrictions
- **Metadata**: Detailed file information in responses

## 🛠️ Best Practices Implemented

### 1. **Comprehensive Schema Definitions**
- Reusable component schemas
- Detailed property descriptions
- Proper data types and constraints
- Example values for all fields

### 2. **Error Handling**
- Standardized error response format
- Specific error codes and messages
- Validation error details
- Rate limiting responses

### 3. **Security Documentation**
- Clear authentication requirements
- Role-based access control
- Token refresh mechanisms
- Secure file upload guidelines

### 4. **Response Examples**
- Success and error scenarios
- Realistic example data
- Multiple response formats
- Pagination examples

### 5. **Parameter Documentation**
- Query parameter descriptions
- Request body schemas
- Path parameter validation
- Optional vs required fields

## 📝 Development Guidelines

### Adding New Endpoints
1. Create the controller and route
2. Add comprehensive Swagger documentation
3. Define request/response schemas
4. Include error handling examples
5. Test the documentation

### Schema Updates
1. Update the main schema in `config/swagger.js`
2. Reference schemas in endpoint documentation
3. Maintain consistency across all endpoints
4. Add proper validation rules

### Error Handling
1. Use standard error response format
2. Include specific error codes
3. Provide helpful error messages
4. Document all possible error scenarios

## 🔧 Configuration Options

### Swagger UI Customization
- Custom CSS styling
- Persistent authorization
- Request duration display
- Filter and search capabilities
- Deep linking support

### Server Configuration
- Development and production servers
- Environment-specific settings
- CORS configuration
- Rate limiting setup

## 📖 Additional Resources

- [OpenAPI 3.0 Specification](https://swagger.io/specification/)
- [Swagger UI Documentation](https://swagger.io/tools/swagger-ui/)
- [JWT Authentication](https://jwt.io/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

## 🤝 Contributing

When contributing to the API documentation:

1. Follow the existing documentation structure
2. Use consistent naming conventions
3. Include comprehensive examples
4. Test all documentation changes
5. Update this README when adding new features

## 📞 Support

For questions about the API documentation:
- Check the interactive documentation at `/api-docs`
- Review the schema definitions
- Test endpoints using the "Try It Out" feature
- Contact the development team for additional support 