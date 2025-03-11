import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((movie) => movie.imdbID !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    alert("Movie removed from favorites!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Favorites</h2>
      {favorites.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {favorites.map((movie) => (
            <div
              key={movie.imdbID}
              style={{
                margin: "10px",
                textAlign: "center",
                display: "inline-block",
              }}
            >
              {/* Clickable Poster */}
              <img
                src={movie.Poster}
                alt={movie.Title}
                onClick={() => navigate(`/movie/${movie.imdbID}`)}
                style={{
                  width: "200px",
                  height: "300px",
                  cursor: "pointer",
                  borderRadius: "10px",
                }}
              />
              <h3>{movie.Title}</h3>
              {/* Remove from Favorites Button */}
              <button
                onClick={() => removeFavorite(movie.imdbID)}
                style={{
                  marginTop: "10px",
                  padding: "5px 10px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no favorite movies yet!</p>
      )}
    </div>
  );
};

export default Favorites;
