import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";

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

it(`Render Main page`, () => {
  const tree = renderer
    .create(<Main
      films={films} movieData={movieData} onFilmTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
