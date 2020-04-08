import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./sign-in.jsx";
import history from "../../history";
import {Router} from "react-router-dom";

it(`Render Sign In page component`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <SignIn
            onSubmit={() => {}}
            signInError={null}
          />
        </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render Sign In page component with error`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <SignIn
            onSubmit={() => {}}
            signInError={`Wrong Email Error`}
          />
        </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
