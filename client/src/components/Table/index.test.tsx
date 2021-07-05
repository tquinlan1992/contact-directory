import React from "react";
import Enzyme, { render } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Table, TableBody, TableHeaders, TableRow } from ".";
Enzyme.configure({ adapter: new Adapter() });

describe("Table", () => {
  describe("with header, body, rows", () => {
    it("renders all the children", () => {
      const wrapper = render(
        <Table>
          <TableHeaders headers={["name", "email", "address"]} />
          <TableBody>
            <TableRow columns={["row_name", "row_email", "row_address"]} />
          </TableBody>
        </Table>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
