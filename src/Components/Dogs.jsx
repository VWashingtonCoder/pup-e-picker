import { useEffect, useState } from "react";
import { DogCard } from "./DogCard";

export const Dogs = () => {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/dogs")
      .then(res => res.json())
      .then(data => setDogs(data));
  }, [])

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
