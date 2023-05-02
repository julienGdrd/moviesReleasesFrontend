import { useState, useEffect } from "react";
import { Popover, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Movie from "./Movie";
import styles from "../styles/Home.module.css";

export default function MovieList(props) {
  const [listMovies, setlistMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);

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

  // Fetching Movies list
  useEffect(() => {
    let urlToFetch;
    if (props.isHome === true) {
      urlToFetch = {
        path: "http://localhost:3000/movies",
      };
    } else {
      urlToFetch = {
        path: "http://localhost:3000/byCat",
        reqObj: {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ genreId: props.catData.id }),
        },
      };
    }
    fetch(urlToFetch.path, urlToFetch.reqObj)
      .then((response) => response.json())
      .then((data) => {
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
        <h2 className={styles.title}>{props.pageTitle}</h2>

        <div className={styles.moviesContainer}>{movies}</div>
      </main>
    </>
  );
}
