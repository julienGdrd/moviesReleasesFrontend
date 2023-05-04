import { useState, useEffect } from "react";
import { Popover, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Movie from "./Movie";
import styles from "../styles/Home.module.css";
import { useSelector } from "react-redux";

export default function MovieList(props) {
  const [listMovies, setlistMovies] = useState([]);
const likedMovies = useSelector((state) => state.likedMovies.value)
console.log('likes:', likedMovies)
console.log('list', listMovies)
  
  useEffect(() => {
    if(props.needToFetch){
      // Fetching Movies list
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
    }else if(props.pageTitle==='Liked movies'){
      setlistMovies(likedMovies)
    }
  }, [props, likedMovies]);

  const movies = listMovies.map((data, i) => {
    return (
      <Movie
        key={i}
        movieData={data}
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
