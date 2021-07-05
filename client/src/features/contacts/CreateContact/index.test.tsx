import Enzyme, { shallow } from "enzyme";
import { CreateContact } from ".";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
Enzyme.configure({ adapter: new Adapter() });

describe("CreateContact", () => {
  it("should render the name, email, address input fields", () => {
    const wrapper = shallow(<CreateContact />);
    expect(wrapper).toMatchSnapshot();
  });
});
