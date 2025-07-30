# API Testing Guide

This guide explains how to test the API endpoints using the Swagger documentation and provides examples for different testing scenarios.

## 🚀 Getting Started

### 1. Access the Documentation
Navigate to `http://localhost:8000/api-docs` to access the interactive API documentation.

### 2. Authentication Setup
Most endpoints require authentication. Follow these steps:

1. **Register a new user** using the `/api/auth/signup` endpoint
2. **Login** using the `/api/auth/login` endpoint to get access tokens
3. **Authorize** in Swagger UI by clicking the "Authorize" button and entering your Bearer token

## 📋 Testing Scenarios

### Authentication Flow

#### 1. User Registration
```bash
POST /api/auth/signup
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "role": "user"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "64bfe34dc6543b99fbcdd8e5",
    "name": "Test User",
    "email": "test@example.com",
    "role": "user",
    "isVerified": false,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### 2. User Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login Successful",
  "data": {
    "user": {
      "_id": "64bfe34dc6543b99fbcdd8e5",
      "name": "Test User",
      "email": "test@example.com",
      "role": "user",
      "isVerified": false
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### User Profile Management

#### 3. Get User Profile
```bash
GET /api/users/profile
Authorization: Bearer <your-access-token>
```

#### 4. Update User Profile
```bash
PUT /api/users/profile
Authorization: Bearer <your-access-token>
Content-Type: multipart/form-data

{
  "name": "Updated Name",
  "email": "updated@example.com",
  "phone": "1234567890"
}
```

#### 5. Upload Profile Image
```bash
POST /api/users/upload-file
Authorization: Bearer <your-access-token>
Content-Type: multipart/form-data

file: [binary file data]
```

### Password Management

#### 6. Forgot Password
```bash
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "test@example.com"
}
```

#### 7. Reset Password
```bash
POST /api/auth/reset-password
Content-Type: application/json

{
  "email": "test@example.com",
  "OTP": 1234,
  "password": "newpassword123"
}
```

#### 8. Change Password
```bash
PUT /api/auth/change-password
Authorization: Bearer <your-access-token>
Content-Type: application/json

{
  "currentPassword": "password123",
  "newPassword": "newpassword123"
}
```

### OTP Verification

#### 9. Verify OTP
```bash
POST /api/otp/verify
Content-Type: application/json

{
  "userId": "64bfe34dc6543b99fbcdd8e5",
  "otp": 123456
}
```

#### 10. Resend OTP
```bash
POST /api/otp/resend
Content-Type: application/json

{
  "userId": "64bfe34dc6543b99fbcdd8e5",
  "email": "test@example.com"
}
```

### Admin Operations

#### 11. Search Users (Admin Only)
```bash
GET /api/users/search?search=test&role=user&page=1&limit=10
Authorization: Bearer <admin-access-token>
```

## 🧪 Testing Tools

### 1. Swagger UI
- **Interactive Testing**: Use the "Try It Out" feature
- **Schema Validation**: Automatic request validation
- **Response Visualization**: Clear response structure display
- **Authentication**: Easy token management

### 2. Postman Collection
Create a Postman collection with these endpoints:

```json
{
  "info": {
    "name": "Backend Starter Kit API",
    "description": "API testing collection"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:8000"
    },
    {
      "key": "accessToken",
      "value": ""
    }
  ],
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register User",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Test User\",\n  \"email\": \"test@example.com\",\n  \"password\": \"password123\"\n}"
            },
            "url": "{{baseUrl}}/api/auth/signup"
          }
        }
      ]
    }
  ]
}
```

### 3. cURL Commands
Test endpoints using cURL:

```bash
# Register user
curl -X POST http://localhost:8000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get profile (with token)
curl -X GET http://localhost:8000/api/users/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 🔍 Error Testing

### 1. Validation Errors
Test with invalid data:

```json
{
  "email": "invalid-email",
  "password": "123"
}
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    },
    {
      "field": "password",
      "message": "Password must be at least 6 characters"
    }
  ]
}
```

### 2. Authentication Errors
Test without token:

```bash
GET /api/users/profile
# No Authorization header
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Unauthorized - Invalid or missing token"
}
```

### 3. File Upload Errors
Test with invalid files:

- **Large file**: Exceeds size limit
- **Invalid format**: Unsupported file type
- **No file**: Missing file in request

## 📊 Performance Testing

### 1. Load Testing
Use tools like Apache Bench or Artillery:

```bash
# Test login endpoint
ab -n 100 -c 10 -p login.json -T application/json http://localhost:8000/api/auth/login

# Test profile endpoint
ab -n 100 -c 10 -H "Authorization: Bearer YOUR_TOKEN" http://localhost:8000/api/users/profile
```

### 2. Rate Limiting
Test OTP endpoints for rate limiting:

```bash
# Send multiple OTP requests quickly
for i in {1..5}; do
  curl -X POST http://localhost:8000/api/otp/resend \
    -H "Content-Type: application/json" \
    -d '{"userId":"USER_ID","email":"test@example.com"}'
done
```

## 🔒 Security Testing

### 1. Token Validation
- Test with expired tokens
- Test with invalid token format
- Test with tokens from other users

### 2. Role-based Access
- Test admin endpoints with user tokens
- Test user endpoints with admin tokens
- Test public endpoints without authentication

### 3. Input Validation
- Test SQL injection attempts
- Test XSS payloads
- Test file upload with malicious content

## 📝 Test Cases Checklist

### Authentication
- [ ] User registration with valid data
- [ ] User registration with invalid data
- [ ] User login with valid credentials
- [ ] User login with invalid credentials
- [ ] Token refresh
- [ ] User logout

### Profile Management
- [ ] Get user profile
- [ ] Update user profile
- [ ] Delete user profile
- [ ] Upload profile image
- [ ] Search users (admin only)

### Password Management
- [ ] Forgot password
- [ ] Reset password with valid OTP
- [ ] Reset password with invalid OTP
- [ ] Change password

### OTP Verification
- [ ] Verify OTP with valid data
- [ ] Verify OTP with invalid data
- [ ] Resend OTP
- [ ] Rate limiting on OTP requests

### Error Handling
- [ ] Validation errors
- [ ] Authentication errors
- [ ] Authorization errors
- [ ] File upload errors
- [ ] Rate limiting errors

## 🚨 Common Issues

### 1. CORS Errors
Ensure CORS is properly configured for frontend testing.

### 2. File Upload Issues
- Check file size limits
- Verify supported file formats
- Ensure proper multipart/form-data encoding

### 3. Token Issues
- Verify token format (Bearer <token>)
- Check token expiration
- Ensure proper token storage

### 4. Database Connection
- Verify MongoDB connection
- Check database indexes
- Monitor connection pool

## 📈 Monitoring

### 1. Response Times
Monitor endpoint response times:
- Login: < 500ms
- Profile operations: < 300ms
- File upload: < 2000ms
- Search operations: < 1000ms

### 2. Error Rates
Track error rates:
- 4xx errors: < 5%
- 5xx errors: < 1%
- Authentication failures: < 10%

### 3. Success Rates
Monitor success rates:
- Registration: > 95%
- Login: > 98%
- File upload: > 90%

## 🔧 Environment Setup

### Development
```bash
# Start server
npm run dev

# Run tests
npm test

# Check API documentation
open http://localhost:8000/api-docs
```

### Production
```bash
# Start server
npm start

# Monitor logs
tail -f logs/error.log
```

## 📞 Support

For testing issues:
1. Check the API documentation
2. Review error logs
3. Test with Postman/cURL
4. Contact the development team 