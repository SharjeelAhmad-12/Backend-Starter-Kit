/**
 * @swagger
 * components:
 *   schemas:
 *     # ========================================
 *     # COMMON RESPONSE SCHEMAS
 *     # ========================================
 *     
 *     ApiResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates if the request was successful
 *           example: true
 *         message:
 *           type: string
 *           description: Response message
 *           example: "Operation completed successfully"
 *         data:
 *           type: object
 *           description: "Response data (optional)"
 *           nullable: true
 *     
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           description: Error message
 *           example: "An error occurred"
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *                 description: Field name that caused the error
 *               message:
 *                 type: string
 *                 description: Specific error message for the field
 *     
 *     # ========================================
 *     # USER SCHEMAS
 *     # ========================================
 *     
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: User's unique identifier
 *           example: "64bfe34dc6543b99fbcdd8e5"
 *         name:
 *           type: string
 *           description: User's full name
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *           example: "johndoe@example.com"
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           description: User's role in the system
 *           example: "user"
 *         isVerified:
 *           type: boolean
 *           description: Whether the user's email is verified
 *           example: true
 *         profileImage:
 *           type: string
 *           description: URL to user's profile image
 *           example: "https://res.cloudinary.com/example/image/upload/v123/profile.jpg"
 *           nullable: true
 *         phone:
 *           type: string
 *           description: User's phone number
 *           example: "1234567890"
 *           nullable: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Account creation timestamp
 *           example: "2024-01-15T10:30:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *           example: "2024-01-15T10:30:00.000Z"
 *     
 *     # ========================================
 *     # AUTHENTICATION SCHEMAS
 *     # ========================================
 *     
 *     LoginResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Login Successful"
 *         data:
 *           type: object
 *           properties:
 *             user:
 *               $ref: '#/components/schemas/User'
 *             accessToken:
 *               type: string
 *               description: JWT access token
 *               example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *             refreshToken:
 *               type: string
 *               description: JWT refresh token
 *               example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     
 *     # ========================================
 *     # PAGINATION SCHEMAS
 *     # ========================================
 *     
 *     Pagination:
 *       type: object
 *       properties:
 *         currentPage:
 *           type: integer
 *           description: Current page number
 *           example: 1
 *         totalPages:
 *           type: integer
 *           description: Total number of pages
 *           example: 5
 *         totalItems:
 *           type: integer
 *           description: Total number of items
 *           example: 50
 *         itemsPerPage:
 *           type: integer
 *           description: Number of items per page
 *           example: 10
 *         hasNextPage:
 *           type: boolean
 *           description: Whether there is a next page
 *           example: true
 *         hasPrevPage:
 *           type: boolean
 *           description: Whether there is a previous page
 *           example: false
 *     
 *     # ========================================
 *     # FILE UPLOAD SCHEMAS
 *     # ========================================
 *     
 *     FileUploadResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "File uploaded successfully"
 *         data:
 *           type: object
 *           properties:
 *             filename:
 *               type: string
 *               description: Original filename
 *               example: "profile-image.jpg"
 *             url:
 *               type: string
 *               description: Public URL of uploaded file
 *               example: "https://res.cloudinary.com/example/image/upload/v123/profile-image.jpg"
 *             publicId:
 *               type: string
 *               description: Cloudinary public ID
 *               example: "example/profile-image"
 *             size:
 *               type: integer
 *               description: File size in bytes
 *               example: 1024000
 *             format:
 *               type: string
 *               description: File format
 *               example: "jpg"
 *             width:
 *               type: integer
 *               description: "Image width (if applicable)"
 *               example: 1920
 *             height:
 *               type: integer
 *               description: "Image height (if applicable)"
 *               example: 1080
 *             resourceType:
 *               type: string
 *               description: "Type of resource (image, video, raw)"
 *               example: "image"
 *     
 *     # ========================================
 *     # OTP SCHEMAS
 *     # ========================================
 *     
 *     OTPVerificationResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "OTP verified successfully"
 *         data:
 *           type: object
 *           properties:
 *             isVerified:
 *               type: boolean
 *               description: Whether the user is now verified
 *               example: true
 *             user:
 *               $ref: '#/components/schemas/User'
 *     
 *     OTPResendResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "OTP resent successfully"
 *         data:
 *           type: object
 *           properties:
 *             expiresAt:
 *               type: string
 *               format: date-time
 *               description: When the OTP expires
 *               example: "2024-01-15T11:00:00.000Z"
 *             userId:
 *               type: string
 *               description: User ID for reference
 *               example: "64bfe34dc6543b99fbcdd8e5"
 *     
 *     # ========================================
 *     # SEARCH AND FILTER SCHEMAS
 *     # ========================================
 *     
 *     UserSearchResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Users fetched successfully"
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *         pagination:
 *           $ref: '#/components/schemas/Pagination'
 *     
 *     # ========================================
 *     # ERROR EXAMPLES
 *     # ========================================
 *     
 *     ValidationErrorExample:
 *       value:
 *         success: false
 *         message: "Validation failed"
 *         errors:
 *           - field: "email"
 *             message: "Email is required"
 *           - field: "password"
 *             message: "Password must be at least 6 characters"
 *     
 *     UnauthorizedErrorExample:
 *       value:
 *         success: false
 *         message: "Unauthorized - Invalid or missing token"
 *     
 *     NotFoundErrorExample:
 *       value:
 *         success: false
 *         message: "User not found"
 *     
 *     RateLimitErrorExample:
 *       value:
 *         success: false
 *         message: "Too many requests. Please wait before trying again"
 *     
 *     FileUploadErrorExample:
 *       value:
 *         success: false
 *         message: "File upload failed"
 *         errors:
 *           - field: "file"
 *             message: "File size exceeds maximum limit"
 *     
 *     # ========================================
 *     # SUCCESS EXAMPLES
 *     # ========================================
 *     
 *     UserRegistrationSuccessExample:
 *       value:
 *         success: true
 *         message: "User registered successfully"
 *         data:
 *           _id: "64bfe34dc6543b99fbcdd8e5"
 *           name: "John Doe"
 *           email: "johndoe@example.com"
 *           role: "user"
 *           isVerified: false
 *           createdAt: "2024-01-15T10:30:00.000Z"
 *           updatedAt: "2024-01-15T10:30:00.000Z"
 *     
 *     LoginSuccessExample:
 *       value:
 *         success: true
 *         message: "Login Successful"
 *         data:
 *           user:
 *             _id: "64bfe34dc6543b99fbcdd8e5"
 *             name: "John Doe"
 *             email: "johndoe@example.com"
 *             role: "user"
 *             isVerified: true
 *             profileImage: "https://res.cloudinary.com/example/image/upload/v123/profile.jpg"
 *             createdAt: "2024-01-15T10:30:00.000Z"
 *             updatedAt: "2024-01-15T10:30:00.000Z"
 *           accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *           refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     
 *     FileUploadSuccessExample:
 *       value:
 *         success: true
 *         message: "File uploaded successfully"
 *         data:
 *           filename: "profile-image.jpg"
 *           url: "https://res.cloudinary.com/example/image/upload/v123/profile-image.jpg"
 *           publicId: "example/profile-image"
 *           size: 1024000
 *           format: "jpg"
 *           width: 1920
 *           height: 1080
 *           resourceType: "image"
 *     
 *     UserSearchSuccessExample:
 *       value:
 *         success: true
 *         message: "Users fetched successfully"
 *         data:
 *           - _id: "64bfe34dc6543b99fbcdd8e5"
 *             name: "John Doe"
 *             email: "johndoe@example.com"
 *             role: "user"
 *             isVerified: true
 *             createdAt: "2024-01-15T10:30:00.000Z"
 *           - _id: "64bfe34dc6543b99fbcdd8e6"
 *             name: "Jane Smith"
 *             email: "janesmith@example.com"
 *             role: "admin"
 *             isVerified: true
 *             createdAt: "2024-01-15T11:00:00.000Z"
 *         pagination:
 *           currentPage: 1
 *           totalPages: 5
 *           totalItems: 50
 *           itemsPerPage: 10
 *           hasNextPage: true
 *           hasPrevPage: false 