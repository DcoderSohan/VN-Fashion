import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  aboutText: {
    type: String,
    default: '',
  },
  designerName: {
    type: String,
    default: '',
  },
  designerTitle: {
    type: String,
    default: '',
  },
  designerBio: {
    type: String,
    default: '',
  },
  designerImage: {
    type: String,
    default: '',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

// Only one about document should exist
aboutSchema.statics.getAbout = async function() {
  let about = await this.findOne();
  if (!about) {
    about = await this.create({});
  }
  return about;
};

const About = mongoose.model("About", aboutSchema);

export default About;
