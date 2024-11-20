import Message from "../models/MessagesModel.js";
import {mkdirSync, renameSync} from 'fs'

export const getAllMessages = async (req, res, next) => {
  try {
    console.log("inside get-all-message function");
    const user1 = req.userId;
    const user2 = req.body.id;

    if (!user1 || !user2) {
      return res.status(400).send("Both user ids are required");
    }

    const message = await Message.find({
      $or: [
        { sender: user1, recipient: user2 },
        { sender: user2, recipient: user1 },
      ],
    }).sort({
      timestamp: 1,
    });

    return res.status(200).json({
      message,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server error");
  }
};

export const uploadFiles = async (req, res, next) => {
  try {
    if(!req.file){
        return res.status(400).send('file is reuired')
    }
    const date = Date.now();
    let fileDir = `uploads/files/${date}`
    let fileName = `${fileDir}/${req.file.originalname}`;

    mkdirSync(fileDir,{recursive:true})
    renameSync(req.file.path,fileName);

    return res.status(200).json({
        filePath: fileName
    })
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server error");
  }
};
