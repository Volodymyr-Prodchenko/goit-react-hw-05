import axios from "axios";
axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzM0N2EyNDZkMmM1MDYxNDMwZjIzYTU1Zjk1ZTQxZSIsIm5iZiI6MTcyNDIyMjI2Ny45MTA5OTQsInN1YiI6IjY2YzM3YzAzN2NiMDIxMzc2OGMzMDIxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HTpwrKHMa4V1zfsfSWQ5exv0anZJK6MjtvT6fPx9zYY",
  },
};

export const fetchTrendingMovies = async () => {
  const response = await axios.get("trending/movie/day", options);
  return response.data;
};

export const fetchMovieByQuery = async (query) => {
  const response = await axios.get(
    `search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  return response.data;
};

export const fetchMovieDetails = async (id) => {
  const response = await axios.get(`movie/${id}`, options);
  return response.data;
};

export const fetchMovieCast = async (id) => {
  const response = await axios.get(`movie/${id}/credits`, options);
  return response.data.cast;
};

export const fetchMovieReview = async (id) => {
  const response = await axios.get(`movie/${id}/reviews`, options);
  return response.data.results;
};
