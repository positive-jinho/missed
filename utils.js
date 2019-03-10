import Like from "./models/Like";

export const setGrid = async photos => {
  const COLUMN_SIZE = 3;
  let gridPhotos = [[], [], []];
  let columns = 0;

  for (const photo of photos) {
    const like = await Like.find({ photo: photo.id });
    const merged = photo.toObject();
    merged.like = like.length;

    gridPhotos[columns].push(merged);
    columns++;

    if (columns === COLUMN_SIZE) {
      columns = 0;
    }
  }

  /*
  photos.forEach(async photo => {
    const like = await Like.find({}, { photo: photo.id });

    console.log({ photo, like: like.length });
    gridPhotos[columns].push({ photo, like: like.length });
    columns++;

    if (columns === COLUMN_SIZE) {
      columns = 0;
    }
  });*/

  return gridPhotos;
};
