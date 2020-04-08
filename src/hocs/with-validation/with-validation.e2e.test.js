import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withValidation from "./with-validation";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withValidation(MockComponent);

it(`Should set validation status`, () => {
  const wrapper = shallow(<MockComponentWrapped />);

  expect(wrapper.props().validationStatus).toEqual(false);

  wrapper.props().onValidateForm(true);
  expect(wrapper.props().validationStatus).toEqual(true);
});
