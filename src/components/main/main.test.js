import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";

const movieData = {
  title: `The Great Gatsby`,
  genre: `Drama`,
  year: 2013,
};

const FILMS_TITLES = [`The Gentlemen`, `Sonic the Hedgehog`, `Guns Akimbo`, `Bloodshot`];

it(`Render Main page`, () => {
  const tree = renderer
    .create(<Main
      filmsTitles={FILMS_TITLES} movieData={movieData} onFilmTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
