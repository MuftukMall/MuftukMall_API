import "./connection/mongoose.js";
import express, { json } from "express";
import cors from "cors";
import batch from "./routes/batch.js";
import subject from "./routes/subject.js";
import chapter from "./routes/chapter.js";
import content from "./routes/content.js";

const app = express();
app.use(json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Api is Working", Date: new Date().toLocaleString() });
});

app.get("/:anything", (req, res) => {
  const anything = req.params.anything;
  res.json({ message: anything });
});

app.use("/api", batch);
app.use("/api", subject);
app.use("/api", chapter);
app.use("/api", content);

app.listen(process.env.PORT, () => {
  console.log(`App is running on Port: ${process.env.PORT}`);
});

export default app;