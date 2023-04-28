import { useState, useEffect } from "react";
import { Popover, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Movie from "./Movie";
// import "antd/dist/antd.css";
import styles from "../styles/Home.module.css";

function Categorie(props) {
  const [listMovies, setlistMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const genreId = props.catData.id;
  // Liked movies (inverse data flow)
  const updateLikedMovies = (movieTitle) => {
    if (likedMovies.find((movie) => movie === movieTitle)) {
      setLikedMovies(likedMovies.filter((movie) => movie !== movieTitle));
    } else {
      setLikedMovies([...likedMovies, movieTitle]);
    }
  };

  const likedMoviesPopover = likedMovies.map((data, i) => {
    return (
      <div key={i} className={styles.likedMoviesContainer}>
        <span className="likedMovie">{data}</span>
        <FontAwesomeIcon
          icon={faCircleXmark}
          onClick={() => updateLikedMovies(data)}
          className={styles.crossIcon}
        />
      </div>
    );
  });

  // Movies list
  useEffect(() => {
    // fetch('https://mymoviz-backend-juliengdrd.vercel.app/movies')
    fetch("http://localhost:3000/byCat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ genreId: genreId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("byGenreFront:", data.movies)
        setlistMovies(data.movies);
      });
  }, [props]);

  const movies = listMovies.map((data, i) => {
    const isLiked = likedMovies.some((movie) => movie === data.title);
    return (
      <Movie
        key={i}
        updateLikedMovies={updateLikedMovies}
        isLiked={isLiked}
        title={data.title}
        overview={`${data.overview.substring(0, 100)} [...]`}
        poster={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        voteAverage={data.vote_average}
        voteCount={data.vote_count}
      />
    );
  });

  return (
    <>
      <main className={styles.main}>
        <h2 className={styles.title}>{props.catData.name}</h2>

        <div className={styles.moviesContainer}>{movies}</div>
      </main>
    </>
  );
}

export default Categorie;
