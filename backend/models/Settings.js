import mongoose from "mongoose";

const socialLinkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
});

const settingsSchema = new mongoose.Schema({
  socialLinks: {
    type: [socialLinkSchema],
    default: [],
  },
  // Keep old fields for backward compatibility
  instagramUrl: {
    type: String,
    default: "",
  },
  whatsappUrl: {
    type: String,
    default: "",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Ensure only one settings document exists
settingsSchema.statics.getSettings = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;

