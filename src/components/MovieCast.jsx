import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import styles from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [showHideButton, setShowHideButton] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization: `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzM0N2EyNDZkMmM1MDYxNDMwZjIzYTU1Zjk1ZTQxZSIsIm5iZiI6MTcyNDE4NjM2My42MjY5NDYsInN1YiI6IjY2YzM3YzAzN2NiMDIxMzc2OGMzMDIxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.deWGABoQrPpqqJOEXYrnelxjJMamdq-GRbK5j-Lkwlw`,
            },
          }
        );
        const data = await response.json();
        setCast(data.cast);
      } catch (error) {
        console.error("Error fetching cast:", error);
      }
    };

    fetchCast();
  }, [movieId]);

  const handleRemoveCastFromUrl = () => {
    const newUrl = location.pathname.replace("/cast", "");
    navigate(newUrl, { replace: true });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const scrolledRatio = scrollTop / (fullHeight - windowHeight);

      if (scrolledRatio > 2 / (fullHeight / windowHeight)) {
        setShowHideButton(true);
      } else {
        setShowHideButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <button onClick={handleRemoveCastFromUrl}>Hide</button>
      <ul className={styles.castList}>
        {cast.map((actor) => (
          <li key={actor.id} className={styles.castItem}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                  : defaultImg
              }
              alt={actor.name}
              width={100}
            />
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
      {showHideButton && (
        <button onClick={handleRemoveCastFromUrl}>Hide</button>
      )}
    </div>
  );
};

export default MovieCast;
