import mongoose from "mongoose";

mongoose.connect(
  "mongodb://localhost:27017/coursework_db",
  {
    useNewUrlParser: true
  },
  (err) => {
    if (err) {
      throw Error(err);
    }
  }
);
