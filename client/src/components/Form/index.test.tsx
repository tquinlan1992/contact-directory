import Enzyme, { render } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Form, TextInput, FormButton } from ".";
Enzyme.configure({ adapter: new Adapter() });

describe("Form components", () => {
  it("renders all the form fields", () => {
    const wrapper = render(
      <Form>
        <TextInput
          onChange={jest.fn()}
          label="text_input_label"
          value="text_input_value"
        />
        <FormButton onClick={jest.fn()} />
      </Form>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
