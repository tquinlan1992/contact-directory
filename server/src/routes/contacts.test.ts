const request = require("supertest");
import express from "express";
import { contactsRouter } from "./contacts";

jest.mock("fs", () => ({
  readFile: jest.fn((path, done) => {
    done(
      null,
      `[{"name": "contact1_name", "email": "contact1_email", "address": "contact1_address", "id": "1"}]`
    );
  }),
  writeFile: jest.fn((path, data, done) => {
    done(null);
  }),
}));

jest.mock("uuid", () => ({
  v4: () => "random_id",
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
            JSON.stringify([
              {
                name: "contact1_name",
                email: "contact1_email",
                address: "contact1_address",
                id: "1",
              },
            ])
          );
          done();
        })
        .catch(done);
    });
  });
  describe("post create new contact", () => {
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
          .then((res: any) => {
            expect(res.text).toEqual(
              JSON.stringify({
                name: "contact_name",
                email: "contact_email@test.com",
                address: "contact_address",
                id: "random_id",
              })
            );
            expect(require("fs").readFile).toHaveBeenCalledTimes(1);
            expect(require("fs").writeFile.mock.calls[0][0]).toContain(
              "/db.json"
            );
            expect(require("fs").writeFile.mock.calls[0][1]).toEqual(
              `[{\"name\":\"contact1_name\",\"email\":\"contact1_email\",\"address\":\"contact1_address\",\"id\":\"1\"},{\"name\":\"contact_name\",\"email\":\"contact_email@test.com\",\"address\":\"contact_address\",\"id\":\"random_id\"}]`
            );
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
            expect(require("fs").readFile).toHaveBeenCalledTimes(1);
            expect(require("fs").writeFile.mock.calls[0][0]).toContain(
              "/db.json"
            );
            expect(require("fs").writeFile.mock.calls[0][1]).toEqual(
              `[{\"name\":\"contact1_name\",\"email\":\"contact1_email\",\"address\":\"contact1_address\",\"id\":\"1\"},{\"name\":\"contact_name\",\"email\":\"contact_email@test.com\",\"id\":\"random_id\"}]`
            );
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
    describe("with name empty", () => {
      it("should reject the request with a status of 400", (done) => {
        request(app)
          .post("/")
          .set("Content-Type", "application/json")
          .send(
            JSON.stringify({
              name: "",
              email: "contact_email@email.com",
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
