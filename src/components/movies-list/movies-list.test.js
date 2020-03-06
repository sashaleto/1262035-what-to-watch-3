import React from "react";
import renderer from "react-test-renderer";
import MoviesList from './movies-list';

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

it(`Render Movies List`, () => {
  const tree = renderer
        .create(<MoviesList
          films={films} onFilmTitleClick={() => {}}
        />)
        .toJSON();

  expect(tree).toMatchSnapshot();
});
