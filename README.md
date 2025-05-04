# 📦 Drive Backend

A secure and scalable backend system for a file drive/storage app built with Node.js, Express, MongoDB, and Cloudinary. It supports features like user authentication, file uploads, activity logs, and admin-level monitoring.

---

## ⚙️ Tech Stack

- Backend: Node.js, Express
- Database: MongoDB (Mongoose ODM)
- File Uploads: Multer, Cloudinary
- Authentication: JWT (JSON Web Token), bcrypt
- Others: dotenv, cors, morgan, streamifier

---

## 📁 Project Structure

/backend ├── src │ ├── controllers │ ├── middleware │ ├── models │ ├── routes │ ├── utils │ └── app.js ├── .env └── package.json




---

## 🚀 Installation & Setup

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

👤 User APIs

Endpoint	Method	Description
/api/auth/register	POST	Register a new user
/api/auth/login	POST	Login and receive JWT token
/api/files/upload	POST	Upload a file (Auth required)
/api/files	GET	List user’s uploaded files
/api/files/:id	DELETE	Delete a file by ID (Auth required)
/api/folders	POST	Create Folder (Auth required)
/api/folders	GET	List of All folders
/api/folders/:id	GET Filter a folder by ID (Auth required)


/api/activity	GET	Get user's activity logs
🛡️ Note: All /api/files and /api/activity routes require Bearer JWT token in headers.

🔐 Admin APIs
All Admin APIs require:

Authenticated user

User role must be "admin"


Endpoint	Method	Description
/api/admin/users	GET	List all registered users
/api/admin/users/:userId/files	GET	View all files uploaded by a specific user
/api/admin/logs	GET	View all activity logs (uploads/deletions)
🔄 API Behavior
🔐 JWT Authentication
Every authenticated route checks for a valid JWT token.

Include the token in the request headers:

http


Authorization: Bearer <token>
📁 File Uploads
Endpoint: POST /api/files/upload

Multipart/form-data required using field name file

Uploads are stored in Cloudinary and saved in MongoDB

📜 Activity Logs
Each upload and delete action by a user is recorded in the ActivityLog collection.

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
