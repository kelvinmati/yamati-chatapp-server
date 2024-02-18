import express from "express";
import {
  getUsers,
  login,
  registerUser,
  userProfile,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", login);
router.get("/users", getUsers);
router.get("/profile", auth, userProfile);

export default router;
