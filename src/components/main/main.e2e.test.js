import React from "react";
import Enzyme, {mount} from "enzyme";
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

it(`Should movie card title be pressed`, () => {
  const onFilmTitleClick = jest.fn();

  const mainScreen = mount(
      <Main
        films={films}
        movieData={movieData}
        onFilmTitleClick={onFilmTitleClick}
      />
  );

  const movieCardTitles = mainScreen.find(`.small-movie-card__title`);

  movieCardTitles.forEach((title) => title.props().onClick());

  expect(onFilmTitleClick.mock.calls.length).toBe(films.length);
});
