# 📦 Drive Backend

A secure and scalable backend system for a file drive/storage app built with Node.js, Express, MongoDB, and Cloudinary. It supports features like user authentication, file uploads, activity logs, and admin-level monitoring.

---

 ⚙️ Tech Stack

- Backend: Node.js, Express
- Database: MongoDB (Mongoose ODM)
- File Uploads: Multer, Cloudinary
- Authentication: JWT (JSON Web Token), bcrypt
- Others: dotenv, cors, morgan, streamifier

---

 📁 Project Structure

/backend ├── src │ ├── controllers │ ├── middleware │ ├── models │ ├── routes │ ├── utils │ └── app.js ├── .env └── package.json




---

 🚀 Installation & Setup

1. Clone the repository

```bash
git clone https://github.com/MuhammadMaaz2001/drive_backend.git
cd drive-backend
Install dependencies

bash


npm install
Configure Environment Variables

Create a .env file:

env


PORT=5000
MONGODB_URI=mongodb:<your setup>
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
Start the server

bash

npm run dev
The server will run at: http://localhost:5000

# 📘 API Documentation – File Management System

This backend provides secure REST APIs for user management, file uploads, folder creation, and admin control. JWT-based authentication is used throughout.

---

 👤 User APIs

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/users/register` | `POST` | Register a new user |
| `/api/users/login` | `POST` | Login and receive JWT token |
| `/api/users/logout` | `GET` | Logout the current user |
| `/api/users/forgot-password` | `POST` | Send password reset link to email |
| `/api/users/reset-password/:token` | `POST` | Reset password using token |
| `/api/users/change-password` | `POST` | Change password (Auth required) |
| `/api/users/make-admin/:userId` | `POST` | Promote a user to admin (Auth required) |

---

 📁 File APIs

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/files/upload` | `POST` | Upload a file (Auth required, `form-data: file`) |
| `/api/files/search` | `GET` | Search files by query |
| `/api/files/:fileId` | `DELETE` | Delete file by ID |

> 🔒 All file upload/delete routes require authentication.

---

 📂 Folder APIs

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/folders` | `POST` | Create a new folder (Auth required) |
| `/api/folders` | `GET` | List all folders |
| `/api/folders/:folderId` | `GET` | Get a folder by ID |

---
Authorization: Bearer <your_token>

---

 🛡️ Admin APIs

> All admin routes require:
> - Logged-in user
> - Role: `admin`

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/admin/users` | `GET` | Get all registered users |
| `/api/admin/users/:userId/files` | `GET` | Get all files uploaded by a specific user |
| `/api/admin/logs` | `GET` | View all user activity logs (uploads/deletes) |

---

 📦 File Upload Details

- Endpoint: `POST /api/files/upload`
- Content-Type: `multipart/form-data`
- Field Name: `file`
- Storage: Uploaded files are saved to Cloudinary and MongoDB.



 🧠 Frontend Integration Notes

- Store the JWT token after login (localStorage or cookies).
- Include `Authorization` header on all protected routes.
- Use `/api/files/search` for implementing file filters.
- Admins can monitor uploads via `/api/admin/logs`.





 🔐 Authentication Notes

All protected routes require a valid JWT token.

# Header Format:

📦 Major Packages Used

Package	Description
express	Web framework
mongoose	ODM for MongoDB
jsonwebtoken	JWT auth
bcryptjs	Password hashing
multer	File handling middleware
cloudinary	Cloud file storage
dotenv	Env config
cors	Enable cross-origin requests
morgan	Request logging
streamifier	Convert buffer to stream (used with Cloudinary)
👥 Roles
👤 User Role
Can register, login, upload, delete and view files

Can view own activity logs

🧑‍💼 Admin Role
Has access to user list, logs, and all user-uploaded files

Can monitor platform activity (optional delete feature can be added)

To make a user an admin, set role: "admin" in the database manually

📌 Future Improvements
Folder nesting and folder-based upload



Email verification and password reset

📬 Contact
For issues or suggestions, open a GitHub issue or contact the maintainer.
