import "./App.css";
import { useEffect, useState } from "react";
import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import "./fonts/RubikBubbles-Regular.ttf";

const dbUrl = "http://localhost:3000/dogs";
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
const requestOptions = {
  method: "",
  headers: myHeaders,
  body: {},
  redirect: "follow",
};

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
    fetch(dbUrl)
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

  const addToFavorites = (id) => {
    const patchRequestOptions = {
      ...requestOptions,
      method: "PATCH",
      body: JSON.stringify({ isFavorite: true }),
    };

    fetch(`${dbUrl}/${id}/`, patchRequestOptions)
      .then((response) => response.json())
      .then((result) => {
        const favDog = result;
        const newAllDogs = allDogs.map((dog) => (dog.id === id ? favDog : dog));
        const newFavsList = [...favoriteDogs, favDog].sort(
          (a, b) => a.id - b.id
        );
        const newUnfavsList = unfavoriteDogs.filter((dog) => dog.id !== id);

        setAllDogs(newAllDogs);
        setFavoriteDogs(newFavsList);
        setUnfavoriteDogs(newUnfavsList);
      })
      .catch((error) => console.log("error", error));
  };

  const removeFromFavorites = (id) => {
    const patchRequestOptions = {
      ...requestOptions,
      method: "PATCH",
      body: JSON.stringify({ isFavorite: false }),
    };

    fetch(`${dbUrl}/${id}/`, patchRequestOptions)
      .then((response) => response.json())
      .then((result) => {
        const unfavDog = result;
        const newAllDogs = allDogs.map((dog) =>
          dog.id === id ? unfavDog : dog
        );
        const newUnfavsList = [...unfavoriteDogs, unfavDog].sort(
          (a, b) => a.id - b.id
        );
        const newFavsList = favoriteDogs.filter((dog) => dog.id !== id);

        setAllDogs(newAllDogs);
        setUnfavoriteDogs(newUnfavsList);
        setFavoriteDogs(newFavsList);
      })
      .catch((error) => console.log("error", error));
  };

  const trashDog = (id) => {
    const deleteRequestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`${dbUrl}/${id}`, deleteRequestOptions)
      .then((response) => response.json())
      .then(() => {
        const newAllDogs = allDogs.filter((dog) => dog.id !== id);
        const newFavsList = favoriteDogs.filter((dog) => dog.id !== id);
        const newUnfavsList = unfavoriteDogs.filter((dog) => dog.id !== id);

        setAllDogs(newAllDogs);
        setFavoriteDogs(newFavsList);
        setUnfavoriteDogs(newUnfavsList);
      })
      .catch((error) => console.log("error", error));
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
            addFav={addToFavorites}
            minusFav={removeFromFavorites}
            trash={trashDog}
          />
        ) : (
          <CreateDogForm />
        )}
      </Section>
    </div>
  );
}

export default App;
