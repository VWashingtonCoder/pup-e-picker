import "./App.css";
import { useEffect, useState } from "react";
import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import "./fonts/RubikBubbles-Regular.ttf";
import {
  addDogDB,
  deleteDogDB,
  fetchDogsDB,
  patchFavoriteDogDB,
} from "./api/api";

function App() {
  const [allDogs, setAllDogs] = useState([]);
  const [currentView, setCurrentView] = useState("all");
  const dogData = {
    all: allDogs,
    favorite: allDogs.filter((dog) => dog.isFavorite),
    unfavorite: allDogs.filter((dog) => !dog.isFavorite),
  };

  const fetchAllDogs = () => {
    fetchDogsDB().then((data) => setAllDogs(data));
  };

  useEffect(() => {
    fetchAllDogs();
  }, []);

  const patchFavoriteDogs = (id, bool) => {
    patchFavoriteDogDB(id, bool).then(() => fetchAllDogs());
  };

  const trashDog = (id) => {
    deleteDogDB(id).then(() => fetchAllDogs());
  };

  const addDog = (dogData) => {
    addDogDB(dogData).then(() => fetchAllDogs());
  };

  return (
    <div className="App">
      <header>
        <h1>pup-e-picker</h1>
      </header>
      <Section
        change={setCurrentView}
        favoriteDogCount={dogData.favorite.length}
        unfavoriteDogCount={dogData.unfavorite.length}
        view={currentView}
      >
        {currentView !== "create" ? (
          <Dogs
            dogs={dogData[currentView]}
            patchFavorite={patchFavoriteDogs}
            trash={trashDog}
          />
        ) : (
          <CreateDogForm addDog={addDog} />
        )}
      </Section>
    </div>
  );
}

export default App;
