import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const movieData = {
  title: `The Great Gatsby`,
  genre: `Drama`,
  year: 2013,
};

const films = [
  {
    title: `The Gentlemen`,
  }, {
    title: `Sonic the Hedgehog`,
  }, {
    title: `Guns Akimbo`,
  }, {
    title: `Bloodshot`,
  }
];

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      films={films} movieData={movieData}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
