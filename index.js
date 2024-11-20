import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/AuthRoutes.js';
import path from 'path'
import { fileURLToPath } from 'url';
import contactRoutes from './routes/ContactRoutes.js';
import setupSocket from './socket.js';
import messagesRoutes from './routes/MessageRoute.js';
import channelRoutes from './routes/ChannelRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const Port = process.env.PORT || 3001;
const database_Url = process.env.DATABASE_URL;
console.log(database_Url)

app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ["GET","POST","PUT","PATCH","DELETE"],
    credentials:true
}))

app.use("/upload", express.static(path.join(__dirname, 'upload')))
console.log(path.join(__dirname, 'uploads/files'))
app.use("/uploads/files", express.static(path.join(__dirname, 'uploads/files')))

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth',authRoutes)
app.use('/api/contacts',contactRoutes)
app.use('/api/messages',messagesRoutes)
app.use('/api/channel',channelRoutes)

const server =app.listen(Port,()=>{
    console.log(`Server is running on http:localhost:${Port}`)
})

setupSocket(server)

mongoose.connect(database_Url).then(()=>{
    console.log("Database connection successful..")
}).catch((err)=>{
    console.log(err.message)
})