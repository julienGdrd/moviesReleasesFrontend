import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Header.module.css";
import Link from "next/link";
export default function Header() {
  const [genreList, setGenreList] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Genres list
  useEffect(() => {
    fetch("http://localhost:3000/genre")
      .then((response) => response.json())
      .then((data) => {
        console.log("genresList:", data.genres);
        setGenreList(data.genres);
      });
  }, []);

  const genres = genreList.map((data, i) => {
    return (
     <Link href={{ pathname: '/categories/[name]', query: { name: data.name, id: data.id } }} key={data.id}>
        <li onClick={() => handleCategorie(data)}>{data.name}</li>
      </Link>
    );
  });

  const handleCategorie = (categorie) => {
    console.log("handleCat", categorie);
  };
  return (
    <>
      <div className={styles.header}>
        <div
          className={
            scrollPosition === 0 ? styles.navBarHight : styles.navBarLow
          }
        >
            <Link href={'/'}>
          <div className={styles.logocontainer}>CinemaFlow</div>
            </Link>
          <div className={styles.tabContainer}>
            <div className={styles.tab}>Last Releases</div>
            <div className={styles.tab}>
              Categories
              <FontAwesomeIcon icon={faAngleDown} className={styles.tabIcon} />
              <div className={styles.tabModal}>
                <ul>{genres}</ul>
              </div>
            </div>
            <div className={styles.tab}>Best rated</div>
            <div className={styles.tab}>Liked movies</div>
            <div className={styles.tab}>Wish list</div>
          </div>
          {/* <Popover
            title="Liked movies"
            content={popoverContent}
            className={styles.popover}
            trigger="click"
          >
            <Button>♥ {likedMovies.length} movie(s)</Button>
          </Popover> */}
        </div>
      </div>
    </>
  );
}
