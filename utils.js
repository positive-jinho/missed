export const setGrid = photos => {
  let gridPhotos = [[], [], []];
  let columns = 0;

  photos.forEach(photo => {
    gridPhotos[columns].push(photo);
    columns++;

    if (columns === 3) {
      columns = 0;
    }
  });

  return gridPhotos;
};
