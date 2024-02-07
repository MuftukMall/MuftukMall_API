import subjectModel from "../models/subjectModel.js";
import { Router } from "express";

const subject = Router();

subject.get("/batch/:batchSlug", async (req, res) => {
  try {
    const _slug = req.params.batchSlug;
    const GetSubjects = await subjectModel.find({ batch: _slug }).select(["-__v", "-batch"]).sort({ createdAt: 1 });
    res.setHeader("Cache-Control", "public, s-maxage=240, stale-while-revalidate=300");
    res.send({ success: true, Data: GetSubjects });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

subject.post("/batch/:batchSlug", async (req, res) => {
  try {
    const _slug = req.params.batchSlug;
    const { name, icon } = req.body;

    const createSubject = await subjectModel.create({
      name: name,
      icon: icon,
      batch: _slug,
    });

    res.status(201).send({
      success: true,
      message: `Subject Created: ${createSubject.name}`,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

subject.delete("/batch/:batchSlug/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const delSubject = await subjectModel.findByIdAndDelete(_id);
    res.send({ success: true, message: `Subject Deleted: ${delSubject.name}` });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

export default subject;
