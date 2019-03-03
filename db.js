import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false
});

const db = mongoose.connection;

const handleOpen = () => console.log("😍 Connected to DB");
const handleError = error => console.log(`😢 Error on DB Connection:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);

export const photos = [
  {
    id: 132,
    title: "A Starry Night in Zion",
    fileUrl:
      "https://images.unsplash.com/flagged/photo-1551301622-6fa51afe75a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    creator: {}
  },

  {
    id: 132,
    title: "A Starry Night in Zion",
    fileUrl:
      "https://images.unsplash.com/flagged/photo-1551301622-6fa51afe75a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    creator: {}
  },

  {
    id: 132,
    title: "A Starry Night in Zion",
    fileUrl:
      "https://images.unsplash.com/flagged/photo-1551301622-6fa51afe75a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    creator: {}
  }
];
