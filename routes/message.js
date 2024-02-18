import express from "express";
import {
  createMessage,
  getMessages,
  getPrivateMessages,
} from "../controllers/message.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.post("/create-message/:chatId", auth, createMessage);
router.get("/all-messages", getMessages);
router.get("/get-private-messages/:chatId", getPrivateMessages);

export default router;
