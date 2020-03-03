export const getPosterName = (title) => {
  return title.toLowerCase().replace(/[.,!:]/g, ``).split(` `).join(`-`);
};
