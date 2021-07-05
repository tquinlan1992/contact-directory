import fetchMock from "fetch-mock";
import { createContact, getContacts } from ".";

beforeEach(() => {
  fetchMock.restore();
});

describe("getContacts", () => {
  const url = "http://localhost:8080/contacts";
  describe("on successful response", () => {
    it("should return contacts", async () => {
      fetchMock.getOnce(url, [
        { name: "name", email: "email", address: "address" },
      ]);
      const result = await getContacts();
      expect(result).toEqual([
        { name: "name", email: "email", address: "address" },
      ]);
    });
  });
  describe("on non 200 response", () => {
    it("should throw error", async () => {
      fetchMock.getOnce(url, 500, {
        overwriteRoutes: true,
      });
      await expect(getContacts()).rejects.toMatch(
        "Error retreiving contacts with status code: 500"
      );
    });
  });
});

describe("postContacts", () => {
  const url = "http://localhost:8080/contacts";

  describe("on successful response", () => {
    it("should return contacts", async () => {
      fetchMock.postOnce(url, 200);
      const result = await createContact({
        name: "contact_name",
        email: "contact_email",
        address: "contact_address",
      });
      expect(result).toEqual(null);
      expect(fetchMock.calls()[0][0]).toEqual(url);
      expect(fetchMock.calls()[0][1]).toMatchObject({
        body: '{"name":"contact_name","email":"contact_email","address":"contact_address"}',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
  });
});
