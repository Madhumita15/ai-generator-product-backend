
---

# Backend README (`backend/README.md`)

```md
# AI Product Content Generator - Backend

Backend API service for an AI-powered product content generation platform. The application provides secure authentication, AI content generation using Gemini AI, and product history management.

---

## 🚀 Features

### Authentication

- User registration
- User login
- JWT based authentication
- HTTP-only cookie token storage
- Protected API routes
- Logout functionality


### AI Content Generation

- Generate AI-powered product descriptions
- Generate short descriptions
- Generate selling points
- Generate SEO keywords
- Generate product taglines

Powered by:

- Google Gemini AI


### Product History

- Save generated content
- Fetch user's generated products
- View product details
- Delete generated content

### Security

- Password hashing using bcrypt
- JWT authentication
- Request validation
- Environment variable protection

---

## 🛠️ Tech Stack

### Backend Technologies

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

---

## 📂 Project Structure


├── 📁 src/
│   ├── 📁 controller/
│   │   ├── 📄 product.controller.js
│   │   └── 📄 user.controller.js
│   ├── 📁 middleware/
│   │   └── 📄 auth.middleware.js
│   ├── 📁 models/
│   │   ├── 📄 product.model.js
│   │   └── 📄 user.model.js
│   ├── 📁 router/
│   │   ├── 📄 auth.router.js
│   │   └── 📄 product.router.js
│   ├── 📁 services/
│   │   └── 📄 gemini.service.js
│   ├── 📁 utils/
│   │   ├── 📄 dbCon.js
│   │   ├── 📄 gemini.js
│   │   └── 📄 httpStatusCode.js
│   └── 📁 validation/
│       ├── 📄 index.js
│       ├── 📄 product.validation.js
│       └── 📄 user.validation.js
├── ⚙️ .env.example
├── ⚙️ .gitignore
├── 📄 app.js
├── ⚙️ package-lock.json
└── ⚙️ package.json

---

## ⚙️ Installation and Setup

Clone repository:https://github.com/Madhumita15/ai-generator-product-backend

```bash
git clone <repository-url>
