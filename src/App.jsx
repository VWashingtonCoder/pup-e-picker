import "./App.css";
import { useEffect, useState } from "react";
import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import "./fonts/RubikBubbles-Regular.ttf";

function App() {
  const [allDogs, setAllDogs] = useState([]);
  const [favDogs, setFavDogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/dogs")
      .then(res => res.json())
      .then(data => setAllDogs(data));
  }, [])

  return (
    <div className="App">
      <header>
        <h1>pup-e-picker</h1>
      </header>
      <Section label={"Dogs: "}>
        <Dogs label={"All Dogs"} dogs={allDogs} />
        {/* <CreateDogForm /> */}
      </Section>
    </div>
  );
}

export default App;
