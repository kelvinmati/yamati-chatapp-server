import express from "express";
import {
  createChat,
  getAllchats,
  getChatsByUserId,
} from "../controllers/chat.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.post("/create-chat", auth, createChat);
router.get("/get-all-chats", getAllchats);
router.get("/get-by-userId", auth, getChatsByUserId);

export default router;
