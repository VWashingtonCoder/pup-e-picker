import "./App.css";
import { useEffect, useState } from "react";
import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import "./fonts/RubikBubbles-Regular.ttf";

function App() {
  const [allDogs, setAllDogs] = useState([]);
  const [favoriteDogs, setFavoriteDogs] = useState([]);
  const [unfavoriteDogs, setUnfavoriteDogs] = useState([]);
  const [currentView, setCurrentView] = useState("all");

  function sortFavoriteDogs(allDogs) {
    const sortedDogs = { favDogs: [], unfavDogs: [] };
    allDogs.forEach((dog) => {
      dog.isFavorite
        ? sortedDogs.favDogs.push(dog)
        : sortedDogs.unfavDogs.push(dog);
    });
    return sortedDogs;
  }

  useEffect(() => {
    fetch("http://localhost:3000/dogs")
      .then((res) => res.json())
      .then((data) => {
        const { favDogs, unfavDogs } = sortFavoriteDogs(data);
        setAllDogs(data);
        setFavoriteDogs(favDogs);
        setUnfavoriteDogs(unfavDogs);
      });
  }, []);

  const changeView = (viewKey) => {
    setCurrentView(viewKey);
  };

  return (
    <div className="App">
      <header>
        <h1>pup-e-picker</h1>
      </header>
      <Section
        change={changeView}
        favoriteDogCount={favoriteDogs.length}
        unfavoriteDogCount={unfavoriteDogs.length}
        view={currentView}
      >
        {currentView !== "create" ? (
          <Dogs 
            allDogs={allDogs}
            favoriteDogs={favoriteDogs}
            unfavoriteDogs={unfavoriteDogs}
            view={currentView}
          />
        ) : (
          <CreateDogForm />
        )}
      </Section>
    </div>
  );
}

export default App;
