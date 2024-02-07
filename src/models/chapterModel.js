import { Schema, model } from "mongoose";

const chapterSchema = new Schema({
  name: { type: String, required: true },
  subject: { type: String },
  slug: { type: String, unique: true },
  paidBatch: { type: Boolean, default: true }
}, { timestamps: { createdAt: true, updatedAt: false }});

chapterSchema.pre("save", async function (next) {
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

const chapterModel = model("Chapter", chapterSchema);

export default chapterModel;
