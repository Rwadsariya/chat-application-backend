import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { getAllMessages, uploadFiles } from "../controllers/MessagesController.js";
import multer from "multer";

const messagesRoutes = Router();
const upload = multer({dest: "uploads/files"})

messagesRoutes.post('/get-all-messages',verifyToken,getAllMessages)
messagesRoutes.post('/upload-file',verifyToken,upload.single('file'),uploadFiles)

export default messagesRoutes;