import express from "express";
import cors from "cors";
import mongoose from "mongoose";
const app = express();
import dot_env from "dotenv";
// socket  setup
import http from "http";
import { Server } from "socket.io";
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

dot_env.config();
import userRoutes from "./routes/user.js";
import messageRoutes from "./routes/message.js";
import chatRoutes from "./routes/chat.js";
import message from "./models/message.js";
// express middlewares
app.use(express.json());
app.use(cors("*"));

app.get("/", (req, res) => {
  res.send("Hello World");
});
// routes middleware
app.use("/user", userRoutes);
app.use("/messages", messageRoutes);
app.use("/chat", chatRoutes);

// db connection
mongoose.set("strictQuery", false);
mongoose
  .connect(`${process.env.MONGODB_URL}`)
  .then(() => console.log("Database connected succesfully"))
  .catch((err) =>
    console.log("Failed to connect to the database.Check your internet")
  );
// server setup
const PORT = 6821;

// Run when client connects
io.on("connection", (socket) => {
  console.log("User connected");

  // send message
  socket.on("new message", (message) => {
    console.log("Messae is", message);
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    // io.emit("message", "A user has left the chat");
    console.log("user has left");
  });
});

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });
// io.on("connection", (socket) => {
//   socket.on("clicked", (data) => {
//     console.log(data);
//   });
// });
// app.set("socketio", io);
server.listen(PORT, () => console.log(`Server listening on port:${PORT}.`));
