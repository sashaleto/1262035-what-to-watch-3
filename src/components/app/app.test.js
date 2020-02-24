import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const movieData = {
  title: `The Great Gatsby`,
  genre: `Drama`,
  year: 2013,
};

const FILMS_TITLES = [`The Gentlemen`, `Sonic the Hedgehog`, `Guns Akimbo`, `Bloodshot`];

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      filmsTitles={FILMS_TITLES} movieData={movieData}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
