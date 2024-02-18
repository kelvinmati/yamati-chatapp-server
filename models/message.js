import mongoose from "mongoose";
const schema = mongoose.Schema;
const messageSchema = new schema(
  {
    sender: {
      type: String,
      ref: "user",
      required: true,
    },
    chatId: {
      type: schema.Types.ObjectId,
      ref: "chat",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("message", messageSchema);
