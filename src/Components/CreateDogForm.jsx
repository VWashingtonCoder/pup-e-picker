import { useState } from "react";
import { dogPictures } from "../assets/dog-pictures";

export const CreateDogForm = ({ addDog }) => {
  const [dogName, setDogName] = useState("");
  const [dogDescription, setDogDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(dogPictures.BlueHeeler);

  const resetForm = () => {
    setDogName("");
    setDogDescription("");
    setSelectedImage(dogPictures.BlueHeeler);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dogData = {
      name: dogName,
      image: selectedImage,
      description: dogDescription,
      isFavorite: false,
    };
    addDog(dogData);
    resetForm();
  };

  return (
    <form action="" id="create-dog-form" onSubmit={handleSubmit}>
      <h4>Create a New Dog</h4>

      <label htmlFor="name">Dog Name</label>
      <input
        id="name"
        type="text"
        onChange={(e) => setDogName(e.target.value)}
        value={dogName}
      />

      <label htmlFor="description">Dog Description</label>
      <textarea
        id="description"
        cols="80"
        rows="10"
        onChange={(e) => setDogDescription(e.target.value)}
        value={dogDescription}
      ></textarea>

      <label htmlFor="picture">Select an Image</label>
      <select id="" onChange={(e) => setSelectedImage(e.target.value)}>
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option key={label} value={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" value="submit" />
    </form>
  );
};
