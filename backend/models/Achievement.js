import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    default: '',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Achievement = mongoose.model("Achievement", achievementSchema);

export default Achievement;
