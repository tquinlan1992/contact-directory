import express from "express";
import fs from "fs";

const contactsRouter = express.Router();

type DBJson = { name: string; email: string; address?: string }[];

const dbJsonPath = __dirname + "/../db.json";

contactsRouter.use(express.json());

contactsRouter.get("/", (req, res) => {
  fs.readFile(dbJsonPath, (err, buf) => {
    if (err) {
      console.log("error reading db.json", err);
      res.status(500);
    } else {
      const dbData = JSON.parse(String(buf)) as DBJson;
      res.json(dbData);
    }
  });
});

contactsRouter.post("/", (req, res) => {
  fs.readFile(dbJsonPath, (err, buf) => {
    if (err) {
      res.status(500);
    } else {
      const dbData = JSON.parse(String(buf)) as DBJson;
      const newContact = {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
      };
      const dbDataWithAddedContact: DBJson = [...dbData, newContact];
      fs.writeFile(
        dbJsonPath,
        JSON.stringify(dbDataWithAddedContact),
        (err) => {
          if (err) {
            console.log("error creating contact");
            res.status(500);
          } else {
            res.status(201);
            res.end();
          }
        }
      );
    }
  });
});

export { contactsRouter };
