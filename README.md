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
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
Install dependencies:
bash
Copy code
npm install
Configure environment variables:
Create a .env file in the root directory with the following variables:
makefile
Copy code
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key
Start the application:
bash
Copy code
npm start
📚 API Endpoints
🔐 Authentication Routes
Route	Method	Middleware	Description
/signup	POST	None	Register a new user.
/login	POST	None	Authenticate user and return a JWT.
/user-info	GET	verifyToken	Retrieve authenticated user info.
/update-profile	POST	verifyToken	Update user profile details.
/add-profile-image	POST	verifyToken, upload.single	Upload a profile image.
/remove-profile-image	DELETE	verifyToken	Remove the profile image.
/logout	POST	verifyToken	Log out the user.
📡 Channel Routes
Route	Method	Middleware	Description
/create-channel	POST	verifyToken	Create a new chat channel.
/get-user-channels	GET	verifyToken	Retrieve all channels of the user.
/get-channel-messages/:channelId	GET	verifyToken	Fetch messages from a specific channel.
📇 Contact Routes
Route	Method	Middleware	Description
/search	POST	verifyToken	Search for contacts.
/get-contacts-for-dm	GET	verifyToken	Retrieve contacts for direct messages.
/get-all-contacts	GET	None	Fetch all contacts in the database.
💬 Message Routes
Route	Method	Middleware	Description
/get-all-messages	POST	verifyToken	Fetch all messages in a chat.
/upload-file	POST	verifyToken, upload.single	Upload a file in a chat.
📂 Middleware Used
verifyToken: Verifies the JWT for secure user authentication.
upload.single: Handles single-file uploads with Multer.
🛡️ Security Features
Passwords are hashed using Bcrypt, ensuring user credentials are securely stored.
Authentication with JWT, providing stateless and secure access control.
Proper handling of CORS to allow trusted origins only.
📤 Contributions
We welcome contributions! If you'd like to contribute, fork the repo, make your changes, and submit a pull request.
