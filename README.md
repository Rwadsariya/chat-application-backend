## 💬 ChatVerse: A Full-Stack Real-Time Chat Application

🚀 **Welcome to ChatVerse**, a powerful and modern real-time chat application! Designed with scalability and security in mind, ChatVerse brings seamless real-time communication with robust backend technology.

---

## ✨ Features

- 🔒 **JWT Middleware**: Secure user authentication with JSON Web Tokens.
- 🗄️ **MongoDB with Mongoose**: Efficient database queries and management.
- 🛡️ **Bcrypt**: Strong password encryption for enhanced security.
- 🚀 **Express Router**: Clean and modular route handling for scalability.
- 📁 **Multer**: Hassle-free file uploads for sharing media within chats.
- ⚡ **WebSocket**: Real-time communication for instant messaging.
- 🌐 **CORS**: Seamlessly handle cross-origin requests for frontend integration.

---

## 📂 Tech Stack

| **Technology**     | **Description**                       |
|---------------------|---------------------------------------|
| **Node.js**         | JavaScript runtime for backend logic |
| **Express.js**      | Lightweight, fast backend framework  |
| **MongoDB**         | NoSQL database for flexible storage  |
| **WebSocket**       | Real-time communication              |
| **JWT**             | Token-based authentication          |
| **Multer**          | Middleware for file uploads         |
| **Bcrypt**          | Password hashing                    |
| **CORS**            | Cross-Origin Request Handling       |

---

## 🛠️ Setup & Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Rwadsariya/chat-application-backend
   cd your-repo

# ⚙️ Configuration Guide

## 2. Configure Environment Variables

To set up the application, create a `.env` file in the root directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key
```

#  Installation
npm install
npm start
   
# API Endpoints

## 🔐 Authentication Routes

| Route                  | Method | Middleware           | Description                              |
|------------------------|--------|----------------------|------------------------------------------|
| `/signup`              | POST   | None                 | Register a new user.                     |
| `/login`               | POST   | None                 | Authenticate user and return a JWT.      |
| `/user-info`           | GET    | `verifyToken`        | Retrieve authenticated user info.        |
| `/update-profile`      | POST   | `verifyToken`        | Update user profile details.             |
| `/add-profile-image`   | POST   | `verifyToken`, `upload.single` | Upload a profile image.         |
| `/remove-profile-image`| DELETE | `verifyToken`        | Remove the profile image.                |
| `/logout`              | POST   | `verifyToken`        | Log out the user.                        |

## 📡 Channel Routes

| Route                          | Method | Middleware    | Description                              |
|--------------------------------|--------|---------------|------------------------------------------|
| `/create-channel`              | POST   | `verifyToken` | Create a new chat channel.               |
| `/get-user-channels`           | GET    | `verifyToken` | Retrieve all channels of the user.       |
| `/get-channel-messages/:channelId` | GET | `verifyToken` | Fetch messages from a specific channel.  |

## 📇 Contact Routes

| Route                     | Method | Middleware    | Description                              |
|---------------------------|--------|---------------|------------------------------------------|
| `/search`                 | POST   | `verifyToken` | Search for contacts.                     |
| `/get-contacts-for-dm`    | GET    | `verifyToken` | Retrieve contacts for direct messages.   |
| `/get-all-contacts`       | GET    | None          | Fetch all contacts in the database.      |

# 📂 Middleware Used

- **`verifyToken`**: Verifies the JWT for secure user authentication.
- **`upload.single`**: Handles single-file uploads with Multer.

# 🛡️ Security Features

- **Password Hashing**: User passwords are hashed using Bcrypt, ensuring credentials are securely stored.
- **JWT Authentication**: Stateless and secure access control using JSON Web Tokens.
- **CORS Handling**: Proper configuration to allow requests only from trusted origins.

# 📤 Contributions

We welcome contributions! Here's how you can contribute:

1. **Fork the Repository**: Create your copy of the project.
2. **Make Changes**: Implement your improvements or fixes.
3. **Submit a Pull Request**: Propose your changes to be reviewed and merged.

Feel free to contribute and improve the project!
