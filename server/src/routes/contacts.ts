import express from "express";
import fs from "fs";

const contactsRouter = express.Router();
contactsRouter.get("/", (req, res) => {
  fs.readFile(__dirname + "/../db.json", function (err, buf) {
    if (err) {
      console.log("error", err);
    }
    const dbData = JSON.parse(String(buf));
    res.json(dbData);
  });
});

export { contactsRouter };
