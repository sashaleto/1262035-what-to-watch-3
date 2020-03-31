import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withActiveItem from "./with-active-item.js";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveItem(MockComponent);

it(`Should set active item`, () => {
  const wrapper = shallow(<MockComponentWrapped />);

  expect(wrapper.props().activeItem).toEqual(null);

  wrapper.props().onActivateItem(`Some Item`);
  expect(wrapper.props().activeItem).toEqual(`Some Item`);

  wrapper.props().onActivateItem({film: `Title`, year: 2020});
  expect(wrapper.props().activeItem).toEqual({film: `Title`, year: 2020});
});
