import { DogCard } from "./DogCard";

export const Dogs = (props) => {
  const { allDogs, favoriteDogs, unfavoriteDogs, view } = props;
  const dogData = {
    all: allDogs,
    favorite: favoriteDogs,
    unfavorite: unfavoriteDogs
  }


  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {dogData[view].map((dog) => (
        <DogCard dog={dog} key={dog.id} />
      ))}
    </>
  );
};
