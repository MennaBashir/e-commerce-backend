# 🛒 E-Commerce Backend API

A RESTful e-commerce backend built with **Express.js** and **MongoDB** (Mongoose). Provides complete APIs for user authentication, product catalog management, shopping cart operations, category organization, and tax configuration — all secured with **JWT-based authentication** and **role-based authorization**.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Users](#-users)
  - [Categories](#-categories)
  - [Products](#-products)
  - [Taxes](#-taxes)
  - [Cart](#-cart)
- [Data Models](#data-models)
- [Authentication & Authorization](#authentication--authorization)
- [Error Handling](#error-handling)
- [Response Format](#response-format)

---

## Tech Stack

| Technology   | Purpose                       |
| ------------ | ----------------------------- |
| Node.js      | Runtime environment           |
| Express 5    | Web framework                 |
| MongoDB      | NoSQL database                |
| Mongoose 9   | ODM for MongoDB               |
| JWT          | Authentication tokens         |
| bcryptjs     | Password hashing              |
| cors         | Cross-Origin Resource Sharing |
| dotenv       | Environment variable loading  |
| nodemon      | Dev auto-restart              |

---

## Project Structure

```
e-commerce-backend/
├── controllers/          # Business logic for each resource
│   ├── cart.js
│   ├── category.js
│   ├── product.js
│   ├── tax.js
│   └── user.js
├── middleware/            # Express middleware
│   ├── allowedTo.js      # Role-based authorization
│   ├── asyncWrapper.js   # Async error catching wrapper
│   └── verifyToken.js    # JWT token verification
├── models/               # Mongoose schemas & models
│   ├── cart.js
│   ├── category.js
│   ├── product.js
│   ├── tax.js
│   └── user.js
├── routes/               # Route definitions
│   ├── cart.js
│   ├── category.js
│   ├── product.js
│   ├── tax.js
│   └── user.js
├── utils/                # Utility modules
│   ├── appError.js       # Custom AppError class
│   ├── generateToken.js  # JWT token generator
│   └── httpStatus.js     # Status string constants
├── PLAN_DEV/             # Development planning docs
│   ├── entities.drawio
│   ├── entities.svg
│   └── PLAN_DEV.md
├── index.js              # App entry point
├── package.json
└── .env                  # Environment variables (not committed)
```

---

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **MongoDB** instance (local or cloud like MongoDB Atlas)

### Installation

```bash
# 1. Clone the repository
git clone <repo-url>
cd e-commerce-backend

# 2. Install dependencies
npm install

# 3. Create a .env file (see Environment Variables below)
cp .env.example .env   # or create manually

# 4. Start the development server
npm run dev
```

### Available Scripts

| Script        | Command              | Description                       |
| ------------- | -------------------- | --------------------------------- |
| `npm run dev` | `nodemon index.js`   | Start server with hot-reloading   |

---

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
PORT=3000
MONGO_URL=mongodb://localhost:27017/ecommerce
JWT_SECRET_KEY=your_super_secret_key_here
```

| Variable         | Required | Description                            |
| ---------------- | -------- | -------------------------------------- |
| `PORT`           | ✅       | Port the server listens on             |
| `MONGO_URL`      | ✅       | MongoDB connection string              |
| `JWT_SECRET_KEY` | ✅       | Secret key for signing JWT tokens      |

---

## API Endpoints

Base URL: `http://localhost:<PORT>/api`

### 👤 Users

| Method | Endpoint              | Auth     | Role    | Description        |
| ------ | --------------------- | -------- | ------- | ------------------ |
| POST   | `/api/users/register` | ❌ None  | Any     | Register a new user |
| POST   | `/api/users/login`    | ❌ None  | Any     | Login & get token  |
| GET    | `/api/users/`         | 🔒 JWT  | Admin   | Get all users      |

#### Register User

```http
POST /api/users/register
Content-Type: application/json
```

```json
{
  "name": "Menna Bashir",
  "email": "menna@example.com",
  "password": "securePassword123",
  "phone": "+201234567890",
  "role": "customer",
  "address": [
    {
      "label": "Home",
      "street": "123 Main St",
      "city": "Cairo",
      "zip": "12345",
      "country": "Egypt"
    }
  ]
}
```

**Response** `201 Created`:

```json
{
  "status": "success",
  "data": {
    "_id": "664f...",
    "name": "Menna Bashir",
    "email": "menna@example.com",
    "role": "customer",
    "token": "eyJhbGciOi..."
  }
}
```

#### Login User

```http
POST /api/users/login
Content-Type: application/json
```

```json
{
  "email": "menna@example.com",
  "password": "securePassword123"
}
```

**Response** `201`:

```json
{
  "status": "success",
  "data": {
    "email": "menna@example.com",
    "name": "Menna Bashir",
    "token": "eyJhbGciOi..."
  }
}
```

---

### 📂 Categories

| Method | Endpoint              | Auth     | Role    | Description          |
| ------ | --------------------- | -------- | ------- | -------------------- |
| GET    | `/api/categories/`    | ❌ None  | Any     | Get all categories   |
| POST   | `/api/categories/`    | 🔒 JWT  | Admin   | Create a category    |
| PUT    | `/api/categories/:id` | 🔒 JWT  | Admin   | Update a category    |
| DELETE | `/api/categories/:id` | 🔒 JWT  | Admin   | Delete a category    |

#### Create Category

```http
POST /api/categories/
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "name": "Electronics",
  "slug": "electronics",
  "description": "Electronic devices and gadgets",
  "image": "https://example.com/electronics.png"
}
```

---

### 📦 Products

| Method | Endpoint             | Auth     | Role    | Description         |
| ------ | -------------------- | -------- | ------- | ------------------- |
| GET    | `/api/products/`     | ❌ None  | Any     | Get all products    |
| POST   | `/api/products/`     | 🔒 JWT  | Admin   | Create a product    |
| PUT    | `/api/products/:id`  | 🔒 JWT  | Admin   | Update a product    |
| DELETE | `/api/products/:id`  | 🔒 JWT  | Admin   | Delete a product    |

#### Create Product

```http
POST /api/products/
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "title": "iPhone 15",
  "slug": "iphone-15",
  "description": "Latest Apple smartphone",
  "price": 999.99,
  "stock": 50,
  "category": "664f...categoryId",
  "image": "https://example.com/iphone15.png"
}
```

---

### 💰 Taxes

| Method | Endpoint          | Auth     | Role    | Description      |
| ------ | ----------------- | -------- | ------- | ---------------- |
| GET    | `/api/taxes/`     | 🔒 JWT  | Any     | Get all taxes    |
| POST   | `/api/taxes/`     | 🔒 JWT  | Admin   | Create a tax     |
| PUT    | `/api/taxes/:id`  | 🔒 JWT  | Admin   | Update a tax     |
| DELETE | `/api/taxes/:id`  | 🔒 JWT  | Admin   | Delete a tax     |

#### Create Tax

```http
POST /api/taxes/
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "name": "VAT",
  "rate": 14,
  "country": "Egypt",
  "region": "All",
  "isActive": true
}
```

---

### 🛒 Cart

| Method | Endpoint                              | Auth     | Role    | Description                |
| ------ | ------------------------------------- | -------- | ------- | -------------------------- |
| GET    | `/api/cart/:userId`                   | 🔒 JWT  | Any     | Get cart items for a user  |
| PUT    | `/api/cart/:userId/items`             | 🔒 JWT  | Admin   | Add/update item in cart    |
| DELETE | `/api/cart/:userId/items/:productId`  | 🔒 JWT  | Admin   | Remove item from cart      |

#### Add Item to Cart

```http
PUT /api/cart/:userId/items
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "product": "664f...productId",
  "quantity": 2,
  "price": 999.99
}
```

> **Note:** If the product already exists in the cart, its quantity and price will be updated. If the user has no cart yet, a new cart is created automatically.

---

## Data Models

### User

| Field      | Type       | Required | Details                               |
| ---------- | ---------- | -------- | ------------------------------------- |
| `name`     | String     | ✅       |                                       |
| `email`    | String     | ✅       | Unique                                |
| `password` | String     | ✅       | Stored as bcrypt hash (10 rounds)     |
| `role`     | String     | ❌       | `"customer"` (default) or `"admin"`   |
| `phone`    | String     | ❌       |                                       |
| `address`  | Array      | ❌       | Objects with: label, street, city, zip, country |
| `token`    | String     | ❌       | Latest JWT token                      |

### Category

| Field         | Type   | Required | Details |
| ------------- | ------ | -------- | ------- |
| `name`        | String | ✅       |         |
| `slug`        | String | ✅       |         |
| `description` | String | ❌       |         |
| `image`       | String | ❌       |         |

### Product

| Field         | Type     | Required | Details                          |
| ------------- | -------- | -------- | -------------------------------- |
| `title`       | String   | ✅       |                                  |
| `slug`        | String   | ✅       |                                  |
| `description` | String   | ❌       |                                  |
| `price`       | Number   | ✅       |                                  |
| `stock`       | Number   | ❌       |                                  |
| `category`    | ObjectId | ✅       | References `CATEGORY` collection |
| `image`       | String   | ❌       |                                  |

### Tax

| Field      | Type    | Required | Details           |
| ---------- | ------- | -------- | ----------------- |
| `name`     | String  | ✅       |                   |
| `rate`     | Number  | ✅       | Default: `0`      |
| `country`  | String  | ❌       |                   |
| `region`   | String  | ❌       |                   |
| `isActive` | Boolean | ❌       | Default: `true`   |

### Cart

| Field        | Type     | Required | Details                        |
| ------------ | -------- | -------- | ------------------------------ |
| `user`       | ObjectId | ✅       | References `USER` collection   |
| `items`      | Array    | ❌       | Array of cart item objects      |
| `items.product`  | ObjectId | ✅  | References `PRODUCT` collection|
| `items.quantity` | Number   | ✅  | Default: `1`                   |
| `items.price`    | Number   | ✅  |                                |
| `totalPrice` | Number   | ❌       | Calculated on cart retrieval   |

### Entity Relationships

```
Category  ─── 1:N ───▸  Product
User      ─── 1:1 ───▸  Cart
Product   ─── N:M ───▸  Cart (via items array)
```

---

## Authentication & Authorization

### How It Works

1. **Register / Login** → Server returns a JWT token (expires in **24 hours**)
2. **Send token** in the `Authorization` header for protected routes:
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
   ```
3. **Middleware chain** for protected routes:
   - `verifyToken` → Validates JWT, attaches decoded user to `req.user`
   - `allowedTo("admin")` → Checks if `req.user.role` matches allowed roles

### Roles

| Role       | Permissions                                              |
| ---------- | -------------------------------------------------------- |
| `customer` | Register, login, view products/categories, view own cart |
| `admin`    | All customer permissions + create/update/delete resources, manage carts, view all users |

---

## Error Handling

The app uses a layered error-handling approach:

1. **`asyncWrapper`** — Wraps async controller functions in try/catch blocks, forwarding errors to Express's error handler via `next(err)`.

2. **`AppError`** — Custom error class extending `Error` with `statusCode` and `status` (`"fail"` for 4xx, `"error"` for 5xx).

3. **Global error handler** — Catches all errors and returns a consistent JSON response:
   ```json
   {
     "status": "fail",
     "message": "Error description here"
   }
   ```

4. **404 handler** — Catches requests to undefined routes:
   ```json
   {
     "status": "fail",
     "message": "Route /api/unknown not found"
   }
   ```

---

## Response Format

All API responses follow a consistent JSON structure:

### Success

```json
{
  "status": "success",
  "data": { ... }
}
```

### Error

```json
{
  "status": "fail" | "error",
  "message": "Descriptive error message"
}
```

---

## Author

**Menna Bashir**

## License

ISC
