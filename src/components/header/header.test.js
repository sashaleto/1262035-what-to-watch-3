import React from "react";
import renderer from "react-test-renderer";
import Header from "./header.jsx";
import {AuthorizationStatus} from "../../reducer/user/user";

const userAvatarUrl = `img/avatar.jpg`;

it(`Render Header component with user avatar`, () => {
  const tree = renderer
    .create(<Header
      userAvatarUrl={userAvatarUrl}
      userAuthStatus={AuthorizationStatus.AUTH}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render Header component with sign in link`, () => {
  const tree = renderer
    .create(<Header
      userAvatarUrl={userAvatarUrl}
      userAuthStatus={AuthorizationStatus.NO_AUTH}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
