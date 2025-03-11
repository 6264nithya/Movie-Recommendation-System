import axios from "axios";

const API_KEY = "1da39c8c";
const BASE_URL = "https://www.omdbapi.com/";

// Fetch movies based on a search query
export const fetchMovies = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
    return response.data.Search || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

// Fetch movie details by ID
export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&i=${id}`);
    return response.data || {};
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return {};
  }
};

// Fetch recommended movies based on genre
export const fetchRecommendedMovies = async (genre) => {
  try {
    const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&s=${genre}`);
    return response.data.Search || [];
  } catch (error) {
    console.error("Error fetching recommended movies:", error);
    return [];
  }
};
