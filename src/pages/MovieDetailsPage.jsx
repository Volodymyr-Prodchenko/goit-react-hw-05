import { useState, useEffect, useRef } from "react";
import {
  useParams,
  useLocation,
  useNavigate,
  Link,
  Outlet,
} from "react-router-dom";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const backLinkLocationRef = useRef(location.state?.from ?? "/");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization: `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzM0N2EyNDZkMmM1MDYxNDMwZjIzYTU1Zjk1ZTQxZSIsIm5iZiI6MTcyNDE4NjM2My42MjY5NDYsInN1YiI6IjY2YzM3YzAzN2NiMDIxMzc2OGMzMDIxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.deWGABoQrPpqqJOEXYrnelxjJMamdq-GRbK5j-Lkwlw`,
            },
          }
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(backLinkLocationRef.current);
  };

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack} className={styles.goBackButton}>
        Go back
      </button>
      {movie && (
        <div className={styles.movieDetails}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className={styles.poster}
          />
          <div className={styles.details}>
            <h1 className={styles.title}>{movie.title}</h1>
            <p className={styles.rating}>Rating: {movie.vote_average} / 10</p>
            <p className={styles.overview}>{movie.overview}</p>
            <p className={styles.genres}>
              Genres: {movie.genres.map((genre) => genre.name).join(", ")}
            </p>
            <nav className={styles.nav}>
              <Link to="cast" className={styles.navLink}>
                Cast
              </Link>
              <Link to="reviews" className={styles.navLink}>
                Reviews
              </Link>
            </nav>
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
