import Enzyme, { shallow } from "enzyme";
import { ContactsPage } from ".";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
Enzyme.configure({ adapter: new Adapter() });

describe("ContactsPage", () => {
  it("should render the table and create contact form", () => {
    const wrapper = shallow(<ContactsPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
