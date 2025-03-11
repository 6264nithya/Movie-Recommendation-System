import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails, fetchRecommendedMovies } from "../services/api";
import Movie from "../components/Movie";

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [rating, setRating] = useState(
    JSON.parse(localStorage.getItem("ratings"))?.[id] || 0
  );

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const details = await fetchMovieDetails(id);
        setMovieDetails(details);
  
        if (details?.Genre) {
          const genre = details.Genre.split(",")[0].trim();
          const recommendations = await fetchRecommendedMovies(genre);
          setRecommendedMovies(recommendations);
        }
      } catch (error) {
        console.error("Error fetching movie details or recommendations:", error);
      }
    };
    getMovieDetails();
  }, [id]);
  

  const handleRating = (newRating) => {
    setRating(newRating);
    const ratings = JSON.parse(localStorage.getItem("ratings")) || {};
    ratings[id] = newRating;
    localStorage.setItem("ratings", JSON.stringify(ratings));
  };

  return (
    <div style={{ padding: "20px" }}>
      {movieDetails ? (
        <div>
          {/* Movie Details Section */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "20px",
              marginBottom: "40px",
            }}
          >
            {/* Movie Poster */}
            <img
              src={movieDetails.Poster}
              alt={movieDetails.Title}
              style={{
                maxWidth: "300px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            />

            {/* Movie Details */}
            <div>
              <h1 style={{ marginBottom: "20px" }}>{movieDetails.Title}</h1>
              <p>
                <strong>Genre:</strong> {movieDetails.Genre}
              </p>
              <p>
                <strong>Plot:</strong> {movieDetails.Plot}
              </p>
              <p>
                <strong>Released:</strong> {movieDetails.Released}
              </p>
              <p>
                <strong>Director:</strong> {movieDetails.Director}
              </p>
              <p>
                <strong>Writer:</strong> {movieDetails.Writer}
              </p>
              <p>
                <strong>Actors:</strong> {movieDetails.Actors}
              </p>
              <p>
                <strong>Runtime:</strong> {movieDetails.Runtime}
              </p>
              <p>
                <strong>IMDB Rating:</strong> {movieDetails.imdbRating}
              </p>
              <p>
                <strong>Language:</strong> {movieDetails.Language}
              </p>
              <p>
                <strong>Country:</strong> {movieDetails.Country}
              </p>
              <p>
                <strong>Awards:</strong> {movieDetails.Awards}
              </p>

              {/* Star Rating */}
              <div>
                <strong>Your Rating:</strong>{" "}
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    onClick={() => handleRating(index + 1)}
                    style={{
                      cursor: "pointer",
                      color: index < rating ? "#FFD700" : "#ccc",
                      fontSize: "1.5em",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Movies Section */}
          <h3>Recommended Movies</h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "center",
            }}
          >
            {recommendedMovies.length > 0 ? (
              recommendedMovies.map((movie) => (
                <Movie key={movie.imdbID} movie={movie} />
              ))
            ) : (
              <p>No recommendations available</p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading movie details...</p>
      )}
    </div>
  );
};

export default MovieDetails;
