import "dotenv/config.js";
import { connect } from "mongoose";

connect(process.env.MONGODB_URL).catch((error) => {
  console.log("DatabaseError: " + error.message);
});
