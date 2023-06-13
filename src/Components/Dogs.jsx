import { DogCard } from "./DogCard";

export const Dogs = (props) => {
  const {
    dogs,
    patchFavorite,
    trash
  } = props;
  

  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {dogs.map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          patch={patchFavorite}
          trash={trash}
        />
      ))}
    </>
  );
};
