import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main";

Enzyme.configure({
  adapter: new Adapter(),
});

const movieData = {
  title: `The Great Gatsby`,
  genre: `Drama`,
  year: 2013,
};

const FILMS_TITLES = [`The Gentlemen`, `Sonic the Hedgehog`, `Guns Akimbo`, `Bloodshot`];

it(`Should movie card title be pressed`, () => {
  const onFilmTitleClick = jest.fn();

  const mainScreen = shallow(
      <Main
        filmsTitles={FILMS_TITLES}
        movieData={movieData}
        onFilmTitleClick={onFilmTitleClick}
      />
  );

  const movieCardTitles = mainScreen.find(`.small-movie-card__title`);

  movieCardTitles.forEach((title) => title.props().onClick());

  expect(onFilmTitleClick.mock.calls.length).toBe(FILMS_TITLES.length);
});
