import batchModel from "../models/batchModel.js";
import { Router } from "express";

const batch = Router();

batch.get("/batch", async (req, res) => {
  try {
    const GetBatch = await batchModel.find({}).select("-__v").sort({ createdAt: 1 });
    res.setHeader("Cache-Control", "public, s-maxage=240, stale-while-revalidate=300");
    res.send({ success: true, Data: GetBatch });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

batch.post("/batch", async (req, res) => {
  try {
    const AddBatch = new batchModel(req.body);
    const createdBatch = await AddBatch.save();
    res.status(201).send({ success: true, message: `Batch Created: ${createdBatch.name}` });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

batch.delete("/batch/:batchId", async (req, res) => {
  try {
    const _id = req.params.batchId;
    const delBatch = await batchModel.findByIdAndDelete(_id);
    res.send({ success: true, message: `Batch Deleted: ${delBatch.name}` });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

export default batch;
