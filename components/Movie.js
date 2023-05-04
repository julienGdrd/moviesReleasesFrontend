import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar, faVideo } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Movie.module.css";

import { addLikedMovie } from "../reducer/likedMovies";
import { useDispatch, useSelector } from "react-redux";

function Movie(props) {
  const dispatch = useDispatch();
  const [watchCount, setWatchCount] = useState(0);
  const [personalNote, setPersonalNote] = useState(0);

  const isLiked = useSelector((state) =>
    state.likedMovies.value.some((movie) => movie.title === props.movieData.title)
  );

  console.log("isLiked:", isLiked);
  // Average evaluation
  const stars = [];
  for (let i = 0; i < 10; i++) {
    let style = {};
    if (i < props.movieData.vote_average - 1) {
      style = { color: "#f1c40f" };
    }
    stars.push(<FontAwesomeIcon key={i} icon={faStar} style={style} />);
  }

  // Watch movie
  const handleWatchMovie = () => {
    setWatchCount(watchCount + 1);
  };
  let videoIconStyle = { cursor: "pointer" };
  if (watchCount > 0) {
    videoIconStyle = { color: "#e74c3c", cursor: "pointer" };
  }

  // Like movie
  const handleLikeMovie = () => {
    dispatch(addLikedMovie(props.movieData));
  };
  let heartIconStyle = { cursor: "pointer" };
  if (isLiked) {
    heartIconStyle = { color: "#e74c3c", cursor: "pointer" };
  }

  // Personal note
  const personalStars = [];
  for (let i = 0; i < 10; i++) {
    let style = { cursor: "pointer" };
    if (i < personalNote) {
      style = { color: "#2196f3", cursor: "pointer" };
    }
    personalStars.push(
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        onClick={() => setPersonalNote(i + 1)}
        style={style}
        className="note"
      />
    );
  }
  console.log('movieData :' ,props.movieData);
  return (
    <div className={styles.card}>
      <img
        className={styles.image}
        src={`https://image.tmdb.org/t/p/w500${props.movieData.poster_path}`}
        alt={props.movieData.title}
      />
      <div className={styles.textContainer}>
        <div>
          <h4 className={styles.name}>{props.movieData.original_title}</h4>
          <p className={styles.description}>{props.movieData.overview}</p>
        </div>
        <div className={styles.iconContainer}>
          <span className={styles.vote}>
            {stars} ({props.movieData.vote_count})
          </span>
          <span>
            {personalStars} ({personalNote})
          </span>
          <span>
            <FontAwesomeIcon
              icon={faVideo}
              onClick={() => handleWatchMovie()}
              style={videoIconStyle}
              className="watch"
            />{" "}
            ({watchCount})
          </span>
          <span>
            <FontAwesomeIcon
              icon={faHeart}
              onClick={() => handleLikeMovie()}
              style={heartIconStyle}
              className="like"
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Movie;
