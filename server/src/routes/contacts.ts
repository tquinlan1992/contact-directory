import express from "express";
import fs from "fs";
import validate from "validate.js";

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

const constraints = {
  name: {
    presence: { allowEmpty: false },
    type: "string",
  },
  email: {
    presence: { allowEmpty: false },
    type: "string",
    email: true,
  },
  address: {
    type: "string",
  },
};

contactsRouter.post("/", (req, res) => {
  const { name, email, address } = req.body;
  const newContact = {
    name,
    email,
    address,
  };
  const validationErrors = validate(newContact, constraints);
  if (validationErrors) {
    res.status(400);
    res.end();
  } else {
    fs.readFile(dbJsonPath, (err, buf) => {
      if (err) {
        res.status(500);
      } else {
        const dbData = JSON.parse(String(buf)) as DBJson;
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
  }
});

export { contactsRouter };
