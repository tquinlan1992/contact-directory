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
  writeFile: jest.fn((path, data, done) => {
    done(null);
  }),
}));

const app = express();
app.use(contactsRouter);

describe("contactsRouter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("get", () => {
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
  describe("post", () => {
    it("should create the contacts", (done) => {
      request(app)
        .post("/")
        .set("Content-Type", "application/json")
        .send(
          JSON.stringify({
            name: "contact_name",
            email: "contact_email@test.com",
            address: "contact_address",
          })
        )
        .expect(201)
        .then((res: any) => {
          done();
        })
        .catch(done);
    });
  });
});
