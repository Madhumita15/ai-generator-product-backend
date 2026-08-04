# AI Product Content Generator - Backend

Backend API service for an AI-powered product content generation platform. This backend provides secure authentication, AI-powered product content generation using Google Gemini AI, and product history management.

The application is built using Node.js, Express.js, MongoDB, and integrates Gemini AI to generate marketing-ready product descriptions, SEO content, and selling points.

---

# 🚀 Features

## 🔐 Authentication System

Implemented a complete authentication system with secure user access.

### Features:

- User registration
- User login
- User logout
- JWT-based authentication
- JWT token stored in HTTP-only cookies
- Protected API routes
- User session management

### Authentication Flow:

```text
User Login
      ↓
Validate email and password
      ↓
Generate JWT token
      ↓
Store token in HTTP-only cookie
      ↓
Client sends cookie with requests
      ↓
Middleware verifies JWT token
      ↓
Access protected resources
```

---

# 🤖 AI Content Generation

Integrated Google Gemini AI for generating product marketing content.

### Generated Content Includes:

- Product Description
- Short Description
- Product Tagline
- Selling Points
- SEO Keywords

### Product Input:

- Product Name
- Category
- Brand Name
- Key Features
- Target Audience

### Implementation:

- Created a dedicated Gemini AI service layer.
- Sends structured prompts to Gemini AI.
- Processes AI-generated responses.
- Stores generated content in MongoDB.
- Handles AI API errors gracefully.

Powered by:

- Google Gemini AI SDK

---

# 📚 Product History Management

Users can manage their previously generated AI content.

### Features:

- Save generated product content
- Fetch user's generated products
- View single product details
- Delete generated content
- User-specific product access

---

# 🛡️ Security Implementation

Implemented multiple security practices:

- Password hashing using bcryptjs
- JWT authentication
- HTTP-only cookie storage
- Protected routes using middleware
- Request validation using Joi
- Environment variable protection
- CORS configuration

---

# 🛠️ Tech Stack

## Backend Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Joi Validation
- Google Gemini AI SDK
- Cookie Parser
- CORS
- dotenv

---

# 📂 Project Structure

```text
├── 📁 src/
│
│   ├── 📁 controller/
│   │   ├── 📄 product.controller.js
│   │   └── 📄 user.controller.js
│   │
│   ├── 📁 middleware/
│   │   └── 📄 auth.middleware.js
│   │
│   ├── 📁 models/
│   │   ├── 📄 product.model.js
│   │   └── 📄 user.model.js
│   │
│   ├── 📁 router/
│   │   ├── 📄 auth.router.js
│   │   └── 📄 product.router.js
│   │
│   ├── 📁 services/
│   │   └── 📄 gemini.service.js
│   │
│   ├── 📁 utils/
│   │   ├── 📄 dbCon.js
│   │   ├── 📄 gemini.js
│   │   └── 📄 httpStatusCode.js
│   │
│   └── 📁 validation/
│       ├── 📄 index.js
│       ├── 📄 product.validation.js
│       └── 📄 user.validation.js
│
├── ⚙️ .env.example
├── ⚙️ .gitignore
├── 📄 app.js
├── ⚙️ package-lock.json
└── ⚙️ package.json
```

---

# 🔗 API Endpoints

## Authentication Routes

### Register User

```http
POST /api/register
```

### Login User

```http
POST /api/login
```

### Logout User

```http
POST /api/logout
```

---

## Product Routes

### Generate AI Product Content

```http
POST /api/generate-product
```

Request Body:

```json
{
  "productName": "Wireless Headphones",
  "category": "Electronics",
  "brandName": "SoundMax",
  "keyFeatures": [
    "Noise cancellation",
    "Long battery life"
  ],
  "targetAudience": "Music lovers"
}
```

---

### Get Product History

```http
GET /api/history
```

---

### Get Single Product

```http
GET /api/product/:id
```

---

### Delete Product

```http
DELETE /api/product/:id
```

---

# 🗄️ Database Models

## User Model

Stores user information:

- Name
- Email
- Password


## Product Model

Stores generated product content:

- Product details
- AI-generated description
- Selling points
- SEO keywords
- Product tagline
- User reference
- Created date

---

# ⚙️ Environment Setup

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

CLIENT_URL=http://localhost:5173
```

---

# 📦 Installation

Clone repository:

```bash
git clone https://github.com/Madhumita15/ai-generator-product-backend.git
```

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

# ▶️ Run Application

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

Server runs on:

```text
http://localhost:5000
```

---

# 🌐 Deployment

Backend deployed using:

- Render


Production API:

```text
https://ai-generator-product-backend.onrender.com
```

---

# 🔒 Security Practices

Implemented:

- JWT authentication
- HTTP-only cookies
- Password encryption
- Protected API routes
- Input validation
- Secure environment variables
- CORS configuration

---

# 👩‍💻 Developer

**Madhumita Das**

MERN Stack Developer
