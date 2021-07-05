const request = require("supertest");
import express from "express";
import { contactsRouter } from "./contacts";

jest.mock("fs", () => ({
  readFile: jest.fn((path, done) => {
    done(
      null,
      `[{"name": "contact1_name", "email": "contact1_email", "address": "contact1_address"}]`
    );
  }),
}));

const app = express();
app.use(contactsRouter);

describe("contactsRouter", () => {
  it("should return db.json", (done) => {
    request(app)
      .get("/")
      .expect(200)
      .then((res: any) => {
        expect(res.text).toEqual(
          `[{\"name\":\"contact1_name\",\"email\":\"contact1_email\",\"address\":\"contact1_address\"}]`
        );
        done();
      })
      .catch(done);
  });
});
