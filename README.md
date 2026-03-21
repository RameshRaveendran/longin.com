# 🚀 Auth System (Node.js + Express + MongoDB + EJS)

A simple, scalable **full-stack authentication system** built to understand real-world backend flow and frontend integration, including authentication (JWT), security (bcrypt), role-based access, and clean architecture.

---

## 📌 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (Authentication)
- bcrypt (Password Hashing)
- EJS (Frontend)
- Postman (API Testing)
- Git & GitHub (Version Control)

---

## ⚙️ Setup

```bash
npm install
npm run dev
```

Server runs on:

http://localhost:5000

---

## 📁 Folder Structure

config/        → Database connection  
controllers/   → Business logic  
models/        → Mongoose schemas  
routes/        → API routes  
middleware/    → Auth & role protection  
utils/         → JWT & hashing logic  
views/         → EJS templates  
public/        → Static files  

---

## 🔐 Features

### 👤 Authentication
- User Registration (hashed password)
- User Login (JWT token)
- Secure password storage using bcrypt

### 🛡️ Authorization
- JWT-based route protection
- Role-based access control (User / Admin)

### 👨‍💼 Admin Features
- Get all users
- Update user details
- Delete users
- Admin-only protected routes
- Admin dashboard UI (EJS)

### 🙍 User Features
- User dashboard (profile UI)
- Secure access using JWT

### 🌐 Frontend (EJS)
- Landing page (Welcome UI)
- Register page
- Login page
- User dashboard
- Admin dashboard
- Logout functionality

---

## 🔄 System Flow

### API Flow

1 → User registers → password hashed → stored in DB  
2 → User logs in → JWT token generated  
3 → Token stored (cookie/header)  
4 → Middleware verifies token  
5 → User attached to req.user  
6 → Role checked (admin/user)  
7 → Access granted or denied  

---

### Browser Flow

1 → User opens landing page (/)  
2 → Clicks login/register  
3 → Authenticates  
4 → Token stored in cookie  
5 → Access dashboard  
6 → Role-based UI rendered  
7 → Logout clears token  

---

## 🔑 API Endpoints

### Auth Routes
- POST /api/users/register → Register user  
- POST /api/users/login → Login user  

### User Routes
- GET /api/users/profile → Get logged-in user  

### Admin Routes
- GET /api/admin/users → Get all users  
- PUT /api/admin/users/:id → Update user  
- DELETE /api/admin/users/:id → Delete user  

---

## 🔐 Security

- Password hashing using bcrypt  
- JWT token authentication  
- Cookie-based authentication (browser)  
- Protected routes using middleware  
- Role-based authorization  
- Sensitive data excluded from responses  

---

## 🧠 Concepts Learned

- MVC Architecture (routes → controllers → models)  
- Middleware flow (request lifecycle)  
- JWT authentication (header + cookies)  
- Password hashing  
- Role-based authorization  
- Server-side rendering (EJS)  
- Full-stack request lifecycle  

---

## 🧪 Testing

### Postman
- Register user  
- Login user  
- Use Bearer Token  
- Test protected routes  

### Browser
- Register → Login → Dashboard → Logout  
- Role-based UI testing (Admin vs User)  

---

## 🚧 Future Improvements

- Secure cookies (httpOnly, secure)  
- Token expiration handling  
- Pagination & search (admin users)  
- Input validation (Joi/Zod)  
- Better UI styling (CSS)  
- Refresh tokens  
- Deployment  

---

## 👨‍💻 Author

Built as a learning project to deeply understand backend systems, authentication flow, and full-stack architecture.

---

## ⭐ Notes

This project follows a structured development approach:
- Feature-based implementation  
- Deep understanding of flow  
- Proper testing (Postman + Browser)  
- Clean architecture & separation of concerns  