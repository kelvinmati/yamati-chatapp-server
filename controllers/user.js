import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dot_env from "dotenv";
import user from "../models/user.js";
dot_env.config();
// register user
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: `User already exists` });
    await User.create({
      username,
      email,
      password,
    });
    // generate  and asign token to the registered user
    // query the new specific user
    const newUser = await User.findOne({ email });
    const token = jwt.sign({ id: newUser._id }, process.env.REGISTER_SECRET);
    // console.log("token is", token);
    return res.status(200).json({ message: "Succesfully registered", token });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// login user
export const login = async (req, res) => {
  // res.send("Login route");
  const { email, password } = req.body;
  try {
    // check if given email and password matches the one in the db
    const existingUser = await User.findOne({ email });
    // // check if passwords match
    // const isPasswordCorrect = await bcrypt.compare(
    //   password,
    //   existingUser.password
    // );
    if (existingUser.password !== password)
      return res.status(409).json("Invalid credentials !!.Try again");

    // generate and assign login token
    const token = jwt.sign({ id: existingUser._id }, process.env.LOGIN_SECRET, {
      expiresIn: "20 days",
    });
    // const role = existingUser.role;
    res
      .status(200)
      .json({ message: "successfully logged in", token, existingUser });
  } catch (error) {
    res.status(500).json(error);
  }
};
// get user profile
export const userProfile = async (req, res) => {
  const user = req.userId;
  // console.log(user);
  try {
    const foundUser = await User.findById({ _id: user });
    return res.status(200).json(foundUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// get all users
export const getUsers = async (req, res) => {
  // const io = req.app.get("socketio");
  // console.log("io is", io);
  try {
    const foundUsers = await User.find();
    return res.status(200).json(foundUsers);
  } catch (error) {
    return res.status(500).json(error);
  }
};
