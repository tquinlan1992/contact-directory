import React from "react";
import Enzyme, { shallow } from "enzyme";
import { ContactsTable } from ".";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
Enzyme.configure({ adapter: new Adapter() });

jest.mock("../../../api", () => ({
  getContacts: Promise.resolve([
    { name: "name", email: "email", address: "address" },
  ]),
}));

describe("ContactsTable", () => {
  describe("on success retreiving contacts", () => {
    it("should render the contacts in table", () => {
      const wrapper = shallow(<ContactsTable />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
