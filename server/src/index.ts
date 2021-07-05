import express from "express";
import cors from "cors";
import fs from "fs";
import { contactsRouter } from "./routes/contacts";
const app = express();
const port = 8080; // default port to listen

const dbJsonPath = __dirname + "/db.json";

// [
//   {
//     "name": "first_contact_name",
//     "emai": "first_contact_email",
//     "address": "first_contact_address"
//   },
//   { "name": "second_contact_name", "email": "second_contact_email" },
//   {
//     "name": "third_contact_name",
//     "email": "third_contact_email",
//     "address": "third_contact_address"
//   }
// ]

const initalizeDbFile = () =>
  fs.stat(dbJsonPath, (err, stat) => {
    if (stat) {
      return;
    } else {
      fs.writeFile(dbJsonPath, "[]", function (err) {
        if (stat || err) {
        } else {
          console.log("db.json saved");
        }
      });
    }
  });

initalizeDbFile();

app.use(cors());
app.use(express.static(__dirname + "/../../client/build"));

app.get("/test", (req, res) => {
  res.json("test response");
});

app.use("/contacts", contactsRouter);

// start the express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
