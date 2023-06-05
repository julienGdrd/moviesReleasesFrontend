import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faCheck,
  faCircleCheck,
  faHeart,
  faPlus,
  faStar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Movie.module.css";

import { addLikedMovie } from "../reducer/likedMovies";
import { toggleWishList } from "../reducer/wishList";
import { useDispatch, useSelector } from "react-redux";

function Movie(props) {
  const dispatch = useDispatch();
  const [showSynopsis, setShowSynopsis] = useState(false);
  const [personalNote, setPersonalNote] = useState(0);

  const isLiked = useSelector((state) =>
    state.likedMovies.value.some(
      (movie) => movie.title === props.movieData.title
    )
  );
  const isInWishList = useSelector((state) =>
    state.wishList.value.some((movie) => movie.title === props.movieData.title)
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

  // Wish movie
  const handleWishList = () => {
    dispatch(toggleWishList(props.movieData));
  };
  let wishIconName = faPlus;
  if (isInWishList) {
    wishIconName = faCircleCheck;
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

  const handleMouseLeave = () => {
    setShowSynopsis(false);
  };

  return (
    <div className={styles.card} onMouseLeave={handleMouseLeave}>
      <img
        className={styles.image}
        src={`https://image.tmdb.org/t/p/w500${props.movieData.poster_path}`}
        alt={props.movieData.title}
      />
      <div className={styles.textContainer}>
        <h4 className={styles.name}>{props.movieData.original_title}</h4>
        <div className={styles.btnContainer}>
          {/*  */}
          {/* <span>
            {personalStars} ({personalNote})
          </span> */}
          <div
            className={styles.btn}
            onClick={() => setShowSynopsis(!showSynopsis)}
            title={showSynopsis ? "Close synopsis" : "Show synopsis"}
          >
            <FontAwesomeIcon icon={!showSynopsis ? faAngleDown : faAngleUp} />
          </div>
          <div
            className={styles.btn}
            onClick={() => handleWishList()}
            title={isInWishList ? "Remove from wish list" : "Add to wish list"}
          >
            <FontAwesomeIcon
              icon={wishIconName}
              style={isInWishList ? { color: "#1a98ff" } : {}}
            />
          </div>
          <div
            className={styles.btn}
            onClick={() => handleLikeMovie()}
            title={isLiked ? "Unlike" : "Like"}
          >
            <FontAwesomeIcon icon={faHeart} style={heartIconStyle} />
          </div>

          {showSynopsis && (
            <div className={styles.modalSynopsis}>
              <p className={styles.description}>{props.movieData.overview}</p>
              <span className={styles.vote}>
                {stars} ({props.movieData.vote_count})
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Movie;
