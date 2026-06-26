import mongoose from 'mongoose';

const classBannerSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  subtitle: { type: String, default: '', trim: true },
  description: { type: String, default: '', trim: true },
  image: { type: String, required: true },
  category: { type: String, default: 'General', trim: true },
  instructor: { type: String, default: '', trim: true },
  duration: { type: String, default: '', trim: true },
  schedule: { type: String, default: '', trim: true },
  price: { type: String, default: '', trim: true },
  seats: { type: String, default: '', trim: true },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('ClassBanner', classBannerSchema);
