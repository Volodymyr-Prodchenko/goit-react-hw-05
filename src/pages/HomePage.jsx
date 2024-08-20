import { useState, useEffect } from "react";
import MovieList from "../components/MovieList";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular",
          {
            headers: {
              Authorization: `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzM0N2EyNDZkMmM1MDYxNDMwZjIzYTU1Zjk1ZTQxZSIsIm5iZiI6MTcyNDE4NjM2My42MjY5NDYsInN1YiI6IjY2YzM3YzAzN2NiMDIxMzc2OGMzMDIxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.deWGABoQrPpqqJOEXYrnelxjJMamdq-GRbK5j-Lkwlw`,
            },
          }
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Popular Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
