import Message from "../models/message.js";
import Chat from "../models/chat.js";
import User from "../models/user.js";

export const createChat = async (req, res) => {
  //   const { sender, receiver } = req.body;
  let userId = req.userId;
  try {
    const createdChat = await Chat.create({
      participants: [userId, req.body.receiver],
    });

    return res.status(200).json(createdChat);
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const getAllchats = async (req, res) => {
  try {
    const chats = await Chat.find()
      .populate("participants")
      .populate("last_message");
    // const chats = await Chat.find();

    return res.status(200).json(chats);
  } catch (error) {
    return res.status(500).json(error);
  }
};
// get chats by user id
export const getChatsByUserId = async (req, res) => {
  const userId = req.userId;
  try {
    const chats = await Chat.find({ participants: { $in: userId } })
      .populate("participants")
      .populate({
        path: "last_message",
        select: "text",
      });
    return res.status(200).json(chats);
  } catch (error) {
    res.status(500).json(error);
  }
};
