const dbUrl = "http://localhost:3000/dogs";
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export const fetchDogsDB = () => {
  return fetch(dbUrl)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
};

export const patchFavoriteDogDB = (id, bool) => {
  const patchRequestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: JSON.stringify({ isFavorite: bool }),
    redirect: "follow",
  };

  return fetch(`${dbUrl}/${id}/`, patchRequestOptions)
    .then((res) => res.json())
    .then(() => console.log("Dog has been patched"))
    .catch((err) => console.log(err));
};

export const deleteDogDB = (id) => {
  const deleteRequestOptions = {
    method: "DELETE",
    redirect: "follow",
  };

  return fetch(`${dbUrl}/${id}`, deleteRequestOptions)
    .then((response) => response.json())
    .then(() => console.log("Dog has been deleted"))
    .catch((err) => console.log(err));
};

export const addDogDB = (dogData) => {
    const postRequestOptions = {
        method: "POST",
        headers: myHeaders,       
        body: JSON.stringify(dogData),
        redirect: 'follow'
    };

    return fetch(dbUrl, postRequestOptions)
        .then((response) => response.json())
        .then(() => console.log("Dog has been added"))
        .catch(err => console.log(err));
}