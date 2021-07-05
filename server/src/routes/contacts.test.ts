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
    describe("with all fields", () => {
      it("should create the contact", (done) => {
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
          .then(() => {
            done();
          })
          .catch(done);
      });
    });
    describe("with just name and email", () => {
      it("should create the contact as address is optional", (done) => {
        request(app)
          .post("/")
          .set("Content-Type", "application/json")
          .send(
            JSON.stringify({
              name: "contact_name",
              email: "contact_email@test.com",
            })
          )
          .expect(201)
          .then(() => {
            done();
          })
          .catch(done);
      });
    });
    describe("with wrongly formatted email", () => {
      it("should reject the request with a status of 400", (done) => {
        request(app)
          .post("/")
          .set("Content-Type", "application/json")
          .send(
            JSON.stringify({
              name: "contact_name",
              email: "wrongly_formatted_email",
              address: "contact_address",
            })
          )
          .expect(400)
          .then(() => {
            done();
          })
          .catch(done);
      });
    });
  });
});
