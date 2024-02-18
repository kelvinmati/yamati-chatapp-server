import mongoose from "mongoose";
const schema = mongoose.Schema;
const userSchema = new schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    chats: [{ type: schema.Types.ObjectId }],
  },
  { timestamps: true }
);

export default mongoose.model("user", userSchema);
