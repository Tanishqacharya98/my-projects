# User Management System (Backend)

## Overview

This project is a **User Management System backend** built using **Node.js, Express, and MongoDB**.

It provides authentication, profile management, and admin management features.

The system supports both **Email/Password authentication and Google OAuth login**.

---

## Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* bcrypt (password hashing)
* Passport.js (Google OAuth)
* Multer (file upload)

---

## Features

### Authentication

* Email & Password Signup/Login
* Google OAuth login
* Password hashing with bcrypt
* JWT authentication
* Duplicate account prevention
* Server-side validation

---

### User Panel

Users can:

* View profile
* Update name, phone, bio
* Upload profile picture
* Change password

---

### Admin Panel

Admins can:

* View users with pagination
* Search users
* Create users
* Edit users
* Delete users
* Block/Unblock users
* Impersonate users

---

## Impersonation

Admins can temporarily log in as another user.

All impersonation actions are stored in the **ImpersonationLogs collection**.

---

## Project Structure

backend
│
├── config
├── controllers
├── middleware
├── models
├── routes
├── utils
│
├── uploads
│
├── app.js
├── server.js
└── .env

---

## Setup Instructions

1️⃣ Clone the repository

git clone <repo-url>

2️⃣ Install dependencies

npm install

3️⃣ Create `.env` file

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/userManagement
JWT_SECRET=your_secret

GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

4️⃣ Run server

npm run dev

Server will run on:

http://localhost:5000
