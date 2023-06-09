export const Section = (props) => {
  const { change, favoriteDogCount, unfavoriteDogCount, view, children } =
    props;

  const dogLabels = {
    all: "All",
    favorite: "Favorite",
    unfavorite: "Unfavorite",
  };

  const handleViewChange = (e) => {
    change(e.target.value !== view 
      ? e.target.value 
      : "all"
    );
  };

  return (
    <section>
      <div className="container-header">
        <div className="container-label">
          Dogs: {view !== "create" ? dogLabels[view] : ""}
        </div>
        <div className="selectors">
          {/* Add the class 'active' to any selector in order to make it's color change */}
          {/* This should display the favorited count */}
          <button
            className={`selector ${view === "favorite" ? "active" : ""}`}
            onClick={handleViewChange}
            value="favorite"
          >
            favorited ( {favoriteDogCount} )
          </button>

          {/* This should display the unfavorited count */}

          <button
            className={`selector ${view === "unfavorite" ? "active" : ""}`}
            onClick={handleViewChange}
            value="unfavorite"
          >
            unfavorited ( {unfavoriteDogCount} )
          </button>
          <button
            className={`selector ${view === "create" ? "active" : ""}`}
            onClick={handleViewChange}
            value="create"
          >
            create dog
          </button>
        </div>
      </div>
      {children}
    </section>
  );
};
