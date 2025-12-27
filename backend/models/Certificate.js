import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  issuedBy: {
    type: String,
    default: '',
  },
  issueDate: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    default: '',
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

const Certificate = mongoose.model("Certificate", certificateSchema);

export default Certificate;
