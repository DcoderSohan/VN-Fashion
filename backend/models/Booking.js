import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  // Personal Information
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    default: '',
  },
  // Service Information
  serviceId: {
    type: String,
    default: '',
  },
  serviceTitle: {
    type: String,
    default: '',
  },
  servicePrice: {
    type: String,
    default: '',
  },
  serviceCategory: {
    type: String,
    default: '',
  },
  // Design Information
  designId: {
    type: String,
    default: '',
  },
  designTitle: {
    type: String,
    default: '',
  },
  designCategory: {
    type: String,
    default: '',
  },
  designPrice: {
    type: String,
    default: '',
  },
  designImage: {
    type: String,
    default: '',
  },
  // Booking Details
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    default: '',
  },
  // Status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
