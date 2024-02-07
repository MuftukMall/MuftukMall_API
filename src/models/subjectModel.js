import { Schema, model } from "mongoose";

const subjectSchema = new Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  batch: { type: String },
  slug: { type: String, unique: true },
}, { timestamps: { createdAt: true, updatedAt: false }});

subjectSchema.pre("save", async function (next) {
  const slug = this.name
    .replace(/\s+/g, "-")
    .replace(":", "-")
    .replace("&", "-")
    .replace(/[<>,?\/|\\{}[\](),||]/g, "-")
    .toLowerCase();
  let baseSlug = `${slug}`;

  while (true) {
    const randomNo = Math.floor(Math.random() * 10000);
    const existing = await this.constructor.findOne({ slug: `${baseSlug}-${randomNo}` }).exec();

    if (!existing) {
      this.slug = `${baseSlug}-${randomNo}`;
      break;
    }
  }
  next();
});

const subjectModel = model("Subject", subjectSchema);

export default subjectModel;
