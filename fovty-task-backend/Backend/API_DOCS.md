# API Documentation

## Authentication APIs

### Signup

POST /api/auth/signup

Body:
{
"name": "Tanishq",
"email": "[tanishq@test.com](mailto:tanishq@test.com)",
"password": "123456"
}

---

### Login

POST /api/auth/login

Body:
{
"email": "[tanishq@test.com](mailto:tanishq@test.com)",
"password": "123456"
}

---

### Google Login

GET /api/auth/google

---

## User APIs

### Get Profile

GET /api/user/profile

Header:
Authorization: Bearer TOKEN

---

### Update Profile

PUT /api/user/profile

Body:
{
"name": "Tanishq",
"phone": "9876543210",
"bio": "MERN Developer"
}

---

### Change Password

PUT /api/user/change-password

---

### Upload Profile Picture

POST /api/user/upload-profile

Form-data:
profilePicture: file

---

## Admin APIs

### Get Users

GET /api/admin/users?page=1

---

### Search Users

GET /api/admin/users?search=name

---

### Create User

POST /api/admin/users

---

### Update User

PUT /api/admin/users/:id

---

### Delete User

DELETE /api/admin/users/:id

---

### Block/Unblock User

PATCH /api/admin/block/:id

---

### Impersonate User

POST /api/admin/impersonate/:id

---

### End Impersonation

POST /api/admin/impersonate/end/:logId
