import mongoose from "mongoose";
import Channel from "../models/ChannelModel.js";
import User from "../models/UserModel.js";

export const createChannel = async (req, res, next) => {
  try {

    const {name,members} = req.body;
    const userId =  req.userId;

    const admin = await User.findById(userId)

    if(!admin){
        res.status(400).send("Admin User not found");
    }

    const validMembers = await User.find({
        _id:{
            $in: members
        }
    })

    // if(validMembers.length !== members){
    //     return res.status(400).send("Some member are not valid user")
    // }

    const newChannel = new Channel({
        name,members,admin:userId
    })

    await newChannel.save();

    return res.status(201).json({
        channel: newChannel
    })
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server error");
  }
};


export const getuserChannel = async (req, res, next) => {
    try {
  
        console.log(req.userId)
      const userId = new mongoose.Types.ObjectId(req.userId)
      console.log(userId)
      const channels = await Channel.find({
        $or:[
            {admin:userId},{members:userId}
        ]
      }).sort({updatedAt:-1})

      console.log(channels)
  
      return res.status(200).json({
        channels
      })
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal Server error");
    }
  };

  export const getChannelMessages = async (req, res, next) => {
    try {
      const {channelId } = req.params;
      console.log(channelId)

      const channel = await Channel.findById(channelId).populate({
        path:"messages",populate:{path: "sender",
          select: "firstname lastname email _id image color"
        }
      })

      if(!channel){
        return res.status(404).send("channel not found")
      }

      const messages  = channel.messages;
      return res.status(201).json({
        messages
      })
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal Server error");
    }
  };