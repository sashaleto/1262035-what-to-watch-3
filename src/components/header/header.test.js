import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import Header from "./header.jsx";
import {AuthorizationStatus} from "../../reducer/user/user";
import history from "../../history.js";

const userAvatarUrl = `img/avatar.jpg`;

it(`Render Header component with user avatar`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <Header
            userAvatarUrl={userAvatarUrl}
            userAuthStatus={AuthorizationStatus.AUTH}
          />
        </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render Header component with sign in link`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <Header
            userAvatarUrl={userAvatarUrl}
            userAuthStatus={AuthorizationStatus.NO_AUTH}
          />
        </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
