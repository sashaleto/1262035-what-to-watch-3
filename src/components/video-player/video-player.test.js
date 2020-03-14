import React from "react";
import renderer from "react-test-renderer";
import VideoPlayer from "./video-player";

const film = {
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
  trailerLink: `https://upload.wikimedia.org/wikipedia/commons/0/05/Leipzig_Hauptbahnhof_Time_Lapse_with_iPhone_4s_2012.webm`,
};

it(`Render VideoPlayer`, () => {
  const tree = renderer
    .create(<VideoPlayer
      src={film.trailerLink}
      isAutoplay={true}
      isMuted={true}
      posterURL={film.posterImage}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
