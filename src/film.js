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

  toRAW() {
    return {
      "id": this.id,
      "name": this.title,
      "poster_image": this.posterImage,
      "preview_image": this.previewImage,
      "background_image": this.backgroundImage,
      "background_color": this.backgroundColor,
      "video_link": this.videoLink,
      "preview_video_link": this.trailerLink,
      "description": this.description,
      "rating": this.rating.score,
      "scores_count": this.rating.count,
      "director": this.director,
      "starring": this.starring,
      "run_time": this.runTime,
      "genre": this.genre,
      "released": this.released,
      "is_favorite": this.isFavorite,
    };
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

  static clone(film) {
    return new Film(film.toRAW());
  }
}
