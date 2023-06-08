import { DogCard } from "./DogCard";

export const Dogs = ({ dogs }) => {
  

  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {dogs.map((dog) => (
        <DogCard dog={dog} key={dog.id} />
      ))}
    </>
  );
};
