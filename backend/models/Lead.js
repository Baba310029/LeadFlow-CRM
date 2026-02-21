import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const activitySchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { type: String, required: true }, // "status", "note", "create", "delete"
  createdAt: { type: Date, default: Date.now }
});

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    source: { type: String, default: "website" },
    status: {
      type: String,
      enum: ["new", "contacted", "converted"],
      default: "new"
    },
    notes: [noteSchema],
    activity: [activitySchema],
    followUpDate: Date
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);