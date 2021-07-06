import express from "express";
import fs from "fs";
import validate from "validate.js";
import { v4 as uuidv4 } from "uuid";

const contactsRouter = express.Router();

type Contact = { name: string; email: string; address?: string; id: string };

const dbJsonPath = __dirname + "/../db.json";

contactsRouter.use(express.json());

contactsRouter.get("/", (req, res) => {
  fs.readFile(dbJsonPath, (err, buf) => {
    if (err) {
      console.log("error reading db.json", err);
      res.status(500);
    } else {
      const dbData = JSON.parse(String(buf)) as Contact[];
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

const saveContact = (
  {
    newContact,
    existingContacts,
  }: { newContact: Omit<Contact, "id">; existingContacts: Contact[] },
  callback: (err: NodeJS.ErrnoException, contact: Contact | null) => void
) => {
  const newContactWithId = { ...newContact, id: uuidv4() };
  const dbDataWithAddedContact: Contact[] = [
    ...existingContacts,
    newContactWithId,
  ];
  fs.writeFile(dbJsonPath, JSON.stringify(dbDataWithAddedContact), (err) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, newContactWithId);
  });
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
    return;
  }
  fs.readFile(dbJsonPath, (err, buf) => {
    if (err) {
      res.status(500);
    } else {
      const dbData = JSON.parse(String(buf)) as Contact[];
      saveContact(
        { newContact, existingContacts: dbData },
        (err, savedContact) => {
          if (err) {
            console.log("error creating contact");
            res.status(500);
            return;
          }
          res.status(201);
          res.json(savedContact);
        }
      );
    }
  });
});

export { contactsRouter };
