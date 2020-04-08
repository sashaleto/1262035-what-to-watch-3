export default class Film {
  constructor(film) {
    this.id = film[`id`];
    this.title = film[`name`];
    this.posterImage = film[`poster_image`];
    this.previewImage = film[`preview_image`];
    this.backgroundImage = film[`background_image`];
    this.backgroundColor = film[`background_color`];
    this.videoLink = film[`video_link`];
    this.trailerLink = film[`preview_video_link`];
    this.description = film[`description`];
    this.rating = {};
    this.rating.score = film[`rating`];
    this.rating.count = film[`scores_count`];
    this.director = film[`director`];
    this.starring = film[`starring`];
    this.runTime = film[`run_time`];
    this.genre = film[`genre`];
    this.released = film[`released`];
    this.isFavorite = film[`is_favorite`];
  }

  static parseFilm(film) {
    return new Film(film);
  }

  static mapIdToFilms(films) {
    return films.reduce((accumulator, film) => {
      accumulator[film.id] = film;
      return accumulator;
    }, {});
  }

  static parseFilms(films) {
    return films.map(Film.parseFilm);
  }
}
