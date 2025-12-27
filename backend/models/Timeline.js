import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
  year: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  event: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  eventDate: {
    type: String,
    default: '',
  },
  place: {
    type: String,
    default: '',
  },
  creationDate: {
    type: String,
    default: '',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Timeline = mongoose.model("Timeline", timelineSchema);

export default Timeline;
