import { Schema, model } from "mongoose";

const batchSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  slug: { type: String, unique: true },
}, { timestamps: { createdAt: true, updatedAt: false }});

batchSchema.pre("save", async function (next) {
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

const batchModel = model("Batch", batchSchema);

export default batchModel;
