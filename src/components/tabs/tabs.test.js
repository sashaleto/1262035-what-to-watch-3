import React from "react";
import renderer from "react-test-renderer";
import Tabs from "./tabs.jsx";

const movie = {
  title: `Gangs of new york`,
  posterImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Gangs_of_New_York_Poster.jpg`,
  previewImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/gangs_of_new_york.jpg`,
  backgroundImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/gangs_of_new_york.jpg`,
  description: `In 1862, Amsterdam Vallon returns to the Five Points area of New York City seeking revenge against Bill the Butcher, his father's killer.`,
  rating: {
    score: 8.8,
    count: 370881,
  },
  director: `Martin Scorsese`,
  starring: [`Leonardo DiCaprio`, `Cameron Diaz`, `Daniel Day-Lewis`],
  genre: `Crime`,
  released: 2002,
  id: 1,
};

const comments = [{
  id: 1,
  user: {
    id: 18,
    name: `Sophie`
  },
  rating: 9,
  comment: `I love this movie. This film is a milestone in cinematography. Great Immersive camera-work. This film is an experience and i has already seen it 4 times and I only see more quality of the film.`,
  date: `2020-03-05T17:15:47.441Z`
}, {
  id: 2,
  user: {
    id: 10,
    name: `Max`
  },
  rating: 4.4,
  comment: `A movie that will take you to another world full of emotions.`,
  date: `2020-02-28T17:15:47.441Z`
}];

it(`Render Tabs`, () => {
  const tree = renderer
        .create(<Tabs movie={movie} activeItem={null} onActivateItem={() => {}} comments={comments}/>)
        .toJSON();

  expect(tree).toMatchSnapshot();
});
