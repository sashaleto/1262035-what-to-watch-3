export const getPosterName = (title) => {
  return title.toLowerCase().replace(/[.,!:]/g, ``).split(` `).join(`-`);
};

export const movieLevelMapper = (rating) => {
  switch (true) {
    case (rating >= 0 && rating < 3):
      return `Bad`;
    case (rating >= 3 && rating < 5):
      return `Normal`;
    case (rating >= 5 && rating < 8):
      return `Good`;
    case (rating >= 8 && rating < 10):
      return `Very good`;
    case (rating === 10):
      return `Awesome`;
    default:
      return ``;
  }
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};
