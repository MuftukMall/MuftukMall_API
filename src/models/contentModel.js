import { Schema, model } from "mongoose";

const contentSchema = new Schema({
  index: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String },
  contentType: { type: String, required: true },
  contentUrl: { type: String, required: true },
  tag: { type: String },
  subject: { type: String },
});

// Update toJSON method to modify contentUrl
contentSchema.methods.toJSON = function () {
  const obj = this.toObject();
  if (obj.contentUrl.includes(".m3u8")) {
    obj.contentUrl = obj.contentUrl.replace(/https:\/\/.*?\.cloudfront\.net/g, "https://pwurlapi.vercel.app").replace(/https:\/\/.*?\.bitgravity\.com/g, "https://pwurlapi.vercel.app");
  }
  return obj;
};

const contentModel = model("Content", contentSchema);

export default contentModel;
