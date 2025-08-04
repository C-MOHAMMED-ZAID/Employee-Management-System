# 🧑‍💼 Employee Management System

A full-featured MERN stack application that allows companies or teams to efficiently manage employees and salary data with role-based access control. Built for both administrators and employees, the app supports authentication, CRUD operations, and structured modules to ensure clarity, privacy, and productivity.

---

## 🚀 Live Demo

The frontend is deployed on Vercel for preview purposes only.  
You can check the UI and try basic interactions here:

🔗 [Live Preview (Frontend Only)] https://employee-management-system-virid-six.vercel.app/

> ⚠️ Note: Backend functionalities (like login, CRUD operations) will not work in this deployment.  
> This deployment is meant only to showcase the design and structure of the project.

---

🎥 **Project Walkthrough Video**  
Check out this short 2-minute walkthrough where I explain the features, tech stack, and my contributions.  
[▶ Watch the video]([link-to-your-video](https://youtu.be/3xBmHBnyhNA))

---

## 📚 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [User Roles & Permissions](#user-roles--permissions)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Security & Auth](#security--auth)
- [Future Improvements](#future-improvements)

---

## 🧠 About the Project

This Employee Management System is designed for startups, HR teams, or internal departments to keep track of employees and their associated data securely. It supports both **admin** and **employee** views with clean routing and permission handling.

The app was rebuilt from a legacy version and enhanced with:
- Role-based login (admin vs employee)
- JWT authentication
- Secure private routes
- Improved UI logic
- MongoDB integration for persistent data

---

## ✨ Features

### 🔐 Authentication
- Email/password login
- Google OAuth login
- Role detection on login (admin vs employee)
- JWT-based token auth (7-day expiry)

### 👩‍💼 Admin Panel
- Create, Read, Update, Delete employees
- Create, Update, Delete salaries
- View all user accounts
- Manage user accounts

### 🙋 Employee Module
- Can log in and view only their own profile
- Cannot view or modify other employees
- Profile includes:
  - Personal Info (Name, Email, Phone)
  - Work Info (Emp No, Department, Designation)
  - Role badge
- Error message if profile not yet created by admin

### 🌐 API & Backend
- Clean Express routes
- Middleware for login and admin protection
- MongoDB models for `User`, `Employee`, `Salary`

### 🖼 UI
- React-based with Bootstrap styling
- Conditional rendering based on login state
- Different navigation views for guests, employees, and admins

---

## 🧾 User Roles & Permissions

| Role     | Description      | Access Level                           |
|----------|------------------|----------------------------------------|
| Admin    | System admin     | Full CRUD access to employees/salaries |
| Employee | Regular user     | Can only view their own profile        |

---

## 🛠 Tech Stack

### Frontend:
- React
- Axios
- Bootstrap
- Context API (for Auth)

### Backend:
- Node.js
- Express.js
- MongoDB (via Mongoose)
- JWT for auth
- Bcrypt for password hashing
- Google OAuth (basic setup)

---

## 📂 Folder Structure (Simplified Overview)

```
root/
│
├── client/ (React Frontend)
│   ├── src/
│   │   ├── components/         # Shared components
│   │   ├── pages/              # Main views (Dashboard, Login, Register)
│   │   ├── context/AuthContext # Auth state logic
│   │   ├── services/api.js     # Axios config
│   │   └── App.js, index.js    # Entry point
│
├── server/ (Node Backend)
│   ├── models/                 # User, Employee, Salary schemas
│   ├── routes/                 # API endpoints (auth, employees, salaries)
│   ├── controllers/            # Business logic
│   ├── middleware/             # requireLogin, requireAdmin
│   ├── config/                 # DB connection
│   └── server.js               # Main entry
│
├── .env                        # Environment secrets (ignored in Git)
├── .gitignore
└── README.md
```

---

## ⚙️ Getting Started

### 🔑 Prerequisites

- Node.js & npm
- MongoDB Atlas URI
- Google OAuth client ID (if using Google login)
- Git

### 🛠 Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/employee-management-app.git
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   touch .env
   ```

   Fill `.env`:
   ```env
   PORT=5000
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

3. **Frontend Setup**
   ```bash
   cd ../client
   npm install
   ```

4. **Run App**
   - In `server`:
     ```bash
     npm run dev
     ```
   - In `client`:
     ```bash
     npm start
     ```

---

## 🌐 API Endpoints

### 🔐 Auth

| Method | Endpoint           | Description                |
|--------|--------------------|----------------------------|
| POST   | /api/auth/register | Register new user          |
| POST   | /api/auth/login    | Login with email/password  |
| POST   | /api/auth/google   | Google OAuth login         |

### 👤 Employee

| Method | Endpoint           | Description                        |
|--------|--------------------|------------------------------------|
| GET    | /api/employees/me  | Get logged-in user's employee data |
| GET    | /api/employees/    | (Admin) List all employees         |
| POST   | /api/employees/    | (Admin) Create employee            |
| PUT    | /api/employees/:id | (Admin) Update employee            |
| DELETE | /api/employees/:id | (Admin) Delete employee            |

### 💰 Salary

| Method | Endpoint           | Description                      |
|--------|--------------------|----------------------------------|
| GET    | /api/salaries/     | (Admin) List all salaries        |
| GET    | /api/salaries/:id  | Get individual employee's salary |
| POST   | /api/salaries/     | (Admin) Create salary            |
| PUT    | /api/salaries/:id  | (Admin) Update salary            |
| DELETE | /api/salaries/:id  | (Admin) Delete salary            |

---

## 🔐 Security & Auth

- Passwords are hashed with `bcrypt` before storing
- JWT tokens are generated on login and stored on client
- Middleware ensures protected routes (admin-only and login-required)
- Role is assigned automatically during registration
- Google OAuth skips password check but maintains same role logic

---

## 🧩 Future Improvements

- Add pagination and filtering in admin views
- Add leave management or attendance tracking
- Export employee list as Excel/PDF
- Switch to Tailwind CSS for cleaner styling
- Add image upload to employee profiles

---

## 🤝 Contributing

This project is still under development, but suggestions and PRs are welcome. Fork it, improve it, and let's build better tools together.

---

## 📩 Contact

- Built by Mohammed Zaid
- Email: mohammedzaid.connect@gmail.com
- LinkedIn: linkedin.com/in/mohammedzaidc

