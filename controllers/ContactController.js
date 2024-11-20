import { response } from "express";
import User from "../models/UserModel.js";
import mongoose from "mongoose";
import Message from "../models/MessagesModel.js";

export const searchContacts = async (req, res, next) => {
  try {
    const { searchText } = req.body;
    if (!searchText) {
      return res.status(400).send("searchtext is required");
    }
    const sanitizedSearchtext = searchText.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );
    const regex = new RegExp(sanitizedSearchtext, "i");

    const contacts = await User.find({
      $and: [
        { _id: { $ne: req.userId } },
        { $or: [{ firstname: regex }, { lastname: regex }, { email: regex }] },
      ],
    });

    return res.status(200).json({
      contacts,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server error");
  }
};

export const getContactsForDmList = async (req, res, next) => {
  try {
    let { userId } = req;
    userId = new mongoose.Types.ObjectId(userId);

    const contacts = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { recipient: userId }],
        },
      },
      {
        $sort: { timestamp: -1 },
      },
      {
        $group: {
          _id: {
            $cond: {
              if: { $eq: ["$sender", userId] },
              then: "$recipient",
              else: "$sender",
            },
          },
          lastMessageTime: { $first: "$timestamp" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "contactInfo",
        },
      },
      {
        $unwind: "$contactInfo",
      },
      {
        $project: {
          _id: 1,
          lastMessageTime: 1,
          email: "$contactInfo.email",
          firstname: "$contactInfo.firstname",
          lastname: "$contactInfo.lastname",
          image: "$contactInfo.image",
          color: "$contactInfo.color",
        },
      },
      {
        $sort: { lastMessageTime: -1 },
      },
    ]);

    return res.status(200).json({
      contacts,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server error");
  }
};

export const getAllContacts = async (req, res, next) => {
  try {
    const users = await User.find(
      {
        _id: {
          $ne: req.userId,
        },
      },
      "firstname lastname _id"
    );

    const contacts = users.map((user) => ({
      label: user.firstname ? `${user.firstname} ${user.lastname}` : user.email,
      value: user._id
    }));

    return res.status(200).json({
      contacts,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server error");
  }
};
