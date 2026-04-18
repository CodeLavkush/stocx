# 📦 STOCX — Inventory Management System

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![React](https://img.shields.io/badge/React-Vite-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue)
![Status](https://img.shields.io/badge/Status-Active-success)

**Version:** 0.1.0
A full-stack **Inventory Management System** built with **React (Vite), Node.js, MongoDB, and Docker**, featuring authentication, email verification, and inventory tracking.

---

# 🚀 Features

* 🔐 User authentication (register/login/logout)
* 📧 Email verification system (Mailtrap)
* 🔑 JWT authentication (access + refresh tokens)
* 📦 Inventory CRUD operations
* 📊 Summary dashboard
* 🛡 Protected routes (middleware-based security)
* 🐳 Dockerized full-stack setup

---

# 🏗️ Tech Stack

### Frontend

* React (Vite)
* React Router
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Nodemailer (Mailtrap SMTP)

### DevOps

* Docker
* Docker Compose

---

# 📁 Project Structure

```txt id="st1"
stocx/
│
├── backend/
│   ├── src/
│   ├── routes/
│   ├── controllers/
│   ├── middlewares/
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── vite.config.js
│   └── .env
│
└── docker-compose.yml
```

---

# 🔐 API ROUTES

## 🔓 Public Routes

```txt id="st2"
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/verify-email
POST /api/v1/auth/refresh-token
```

---

## 🔒 Protected Routes

```txt id="st3"
POST /api/v1/auth/logout
POST /api/v1/auth/current-user
POST /api/v1/auth/resend-email-verification
```

---

## 📊 Summary

```txt id="st4"
GET /api/v1/summary
```

---

## ❤️ Health Check

```txt id="st5"
GET /
```

---

## 📦 Inventory Routes

```txt id="st6"
POST   /api/v1/items
GET    /api/v1/items
GET    /api/v1/items/:itemId
PUT    /api/v1/items/:itemId
DELETE /api/v1/items/:itemId
```

---

# ⚙️ Environment Variables

## 🔧 Backend `.env.sample`

```env id="st7"
MONGODB_URL=your_mongo_db_cluster_url
PORT=your_backend_port
CORS_ORIGIN=*

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d

MAILTRAP_SMTP_HOST=your_mailtrap_host
MAILTRAP_SMTP_PORT=your_mailtrap_port
MAILTRAP_SMTP_USER=your_mailtrap_user
MAILTRAP_SMTP_PASS=your_mailtrap_pass
```

---

## 🎨 Frontend `.env`

```env id="st8"
VITE_API_URL=http://localhost:4000
```

---

# 🐳 Docker Setup

## 🚀 Run Project

```bash id="st9"
docker-compose up --build
```

---

## 🌐 Access URLs

| Service  | URL                                            |
| -------- | ---------------------------------------------- |
| Frontend | [http://localhost:3000](http://localhost:3000) |
| Backend  | [http://localhost:4000](http://localhost:4000) |

---

## 🛑 Stop Project

```bash id="st10"
docker-compose down
```

---

## 🔄 Rebuild

```bash id="st11"
docker-compose up --build
```

---

# 💻 Local Development

## Backend

```bash id="st12"
cd backend
npm install
npm run dev
```

## Frontend

```bash id="st13"
cd frontend
npm install
npm run dev
```

---

# 🔐 Authentication Flow

1. User registers
2. Email verification sent
3. Login generates JWT tokens
4. Protected routes require access token
5. Refresh token extends session
6. Logout clears session

---

# 🧠 System Architecture

```txt id="st14"
Frontend (React Vite)
        ↓ /api
Backend (Node.js Express)
        ↓
MongoDB Database
```

---

# 🐳 Docker Architecture

```txt id="st15"
Frontend (Nginx + React build)
        ↓
    /api proxy
        ↓
Backend (Node.js API)
        ↓
MongoDB
```

---

# 🚀 Future Improvements

* Role-based access (Admin/User)
* Stock alerts system
* Pagination & search
* Analytics dashboard charts
* Redis caching layer

---

# 👨‍💻 Author

Built with ❤️ using MERN + Docker for learning and production-ready deployment.

---
