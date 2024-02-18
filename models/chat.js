import mongoose from "mongoose";
const schema = mongoose.Schema;
const chatSchema = new schema(
  {
    // sender: {
    //   type: schema.Types.ObjectId,
    //   ref: "user",
    //   required: true,
    // },
    // receipient: {
    //   type: schema.Types.ObjectId,
    //   ref: "user",
    //   required: true,
    // },
    participants: [
      {
        type: schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
    ],
    last_message: {
      type: schema.Types.ObjectId,
      ref: "message",
      // required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("chat", chatSchema);
