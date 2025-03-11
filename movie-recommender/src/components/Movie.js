import React from "react";
import { useNavigate } from "react-router-dom";

const Movie = ({ movie }) => {
  const navigate = useNavigate();

  const handlePosterClick = () => {
    navigate(`/movie/${movie.imdbID}`);
  };

  const handleAddToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.find((fav) => fav.imdbID === movie.imdbID)) {
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert(`${movie.Title} added to favorites!`);
    } else {
      alert(`${movie.Title} is already in favorites!`);
    }
  };

  return (
    <div style={{ margin: "10px", display: "inline-block", textAlign: "center" }}>
      <img
        src={movie.Poster}
        alt={movie.Title}
        onClick={handlePosterClick}
        style={{ width: "200px", height: "300px", cursor: "pointer", borderRadius: "10px" }}
      />
      <h3>{movie.Title}</h3>
      <div>
        <button onClick={handlePosterClick} style={{ marginRight: "10px" }}>
          Details
        </button>
        <button onClick={handleAddToFavorites}>Add to Favorites</button>
      </div>
    </div>
  );
};

export default Movie;
