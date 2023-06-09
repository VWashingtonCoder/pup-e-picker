import { DogCard } from "./DogCard";

export const Dogs = (props) => {
  const {
    allDogs,
    favoriteDogs,
    unfavoriteDogs,
    view,
    addFav,
    minusFav,
    trash,
  } = props;
  const dogData = {
    all: allDogs,
    favorite: favoriteDogs,
    unfavorite: unfavoriteDogs,
  };

  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {dogData[view].map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          addFav={addFav}
          minusFav={minusFav}
          trash={trash}
        />
      ))}
    </>
  );
};
