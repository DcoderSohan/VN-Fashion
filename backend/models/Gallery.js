import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  materials: {
    type: String,
    default: '',
  },
  price: {
    type: String,
    default: '',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Gallery = mongoose.model("Gallery", gallerySchema);

export default Gallery;
