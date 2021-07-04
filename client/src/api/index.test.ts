import fetchMock from "fetch-mock";
import { getContacts } from ".";

describe("getContacts", () => {
  const url = "http://localhost:8080/contacts";
  describe("on successful response", () => {
    it("should return contacts", async () => {
      fetchMock.getOnce("http://localhost:8080/contacts", [
        { name: "name", email: "email", address: "address" },
      ]);
      const result = await getContacts();
      expect(result).toEqual([
        { name: "name", email: "email", address: "address" },
      ]);
    });
  });
  describe("on non 200 response", () => {
    it("should return contacts", async () => {
      fetchMock.getOnce("http://localhost:8080/contacts", 500, {
        overwriteRoutes: true,
      });
      await expect(getContacts()).rejects.toMatch(
        "Error retreiving contacts with status code: 500"
      );
    });
  });
});
