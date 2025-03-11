import React, { useState, useEffect } from "react";
import { fetchMovies } from "../services/api";
import Movie from "../components/Movie";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("avengers");
  const navigate = useNavigate();

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies(query);
      setMovies(data);
    };
    getMovies();
  }, [query]);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          style={{ padding: "10px", marginRight: "10px" }}
        />
        <button onClick={() => navigate("/favorites")} style={{ padding: "10px" }}>
          View Favorites
        </button>
      </div>
      <div>
        {movies?.length > 0 ? (
          movies.map((movie) => <Movie key={movie.imdbID} movie={movie} />)
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
