export const setGrid = photos => {
  const COLUMN_SIZE = 3;
  let gridPhotos = [[], [], []];
  let columns = 0;

  photos.forEach(photo => {
    gridPhotos[columns].push(photo);
    columns++;

    if (columns === COLUMN_SIZE) {
      columns = 0;
    }
  });

  return gridPhotos;
};
