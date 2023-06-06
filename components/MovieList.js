import { useState, useEffect } from "react";
import Movie from "./Movie";
import styles from "../styles/Home.module.css";
import { useSelector } from "react-redux";

export default function MovieList(props) {
  const [listMovies, setlistMovies] = useState([]);
  const likedMovies = useSelector((state) => state.likedMovies.value);
  const wishList = useSelector((state) => state.wishList.value);

  console.log("propsRequest : ", props.urlToFetch);

  useEffect(() => {
    if (props.urlToFetch) {
      fetch(props.urlToFetch.path, props.urlToFetch.reqObj)
        .then((response) => response.json())
        .then((data) => {
          setlistMovies(data.movies);
        });
    } else if (props.pageTitle === "Liked movies") {
      setlistMovies(likedMovies);
    } else if (props.pageTitle === "Wish list") {
      setlistMovies(wishList);
    }
  }, [props, likedMovies, wishList]);

  const movies = listMovies.map((data, i) => {
    return <Movie key={i} movieData={data} />;
  });

  return (
    <>
      <main className={styles.main}>
        <h2 className={styles.title}>{props.pageTitle}</h2>
        <div className={styles.moviesContainer}>{movies}</div>
        {listMovies.length === 0 && "No  movies"}
      </main>
    </>
  );
}
