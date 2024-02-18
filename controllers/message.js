import Chat from "../models/chat.js";
import Message from "../models/message.js";
// import { getApiAndEmit } from "../app.js";

export const createMessage = async (req, res) => {
  const { chatId } = req.params;
  let userId = req.userId;
  // console.log("userId is", userId);
  try {
    // const createdChat = await Chat.create(req.body);
    const createdMessage = await Message.create({
      sender: userId,
      chatId,
      text: req.body.text,
    });
    await Chat.findByIdAndUpdate(
      { _id: chatId },
      { last_message: createdMessage._id },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Message succesfully created", createdMessage });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// get messages
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json(error);
  }
};
// get private messages
export const getPrivateMessages = async (req, res) => {
  const { chatId } = req.params;
  // console.log("Socket is");
  // const socket = getApiAndEmit();
  // getApiAndEmit().emit("FromAPI", "TEST SOCKET");
  try {
    const messages = await Message.find({ chatId: chatId });
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json(error);
  }
};
