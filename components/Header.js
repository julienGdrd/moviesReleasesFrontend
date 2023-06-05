import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Header.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";
export default function Header() {
  const [genreList, setGenreList] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  const likedList = useSelector((state) => state.likedMovies.value);
  const likedCounter = likedList.length;
  const wishList = useSelector((state) => state.wishList.value);
  const wishCounter = wishList.length;
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
    const nameWithoutSpaces = data.name.replace(/\s+/g, "");
    const as = `/categories/${nameWithoutSpaces}`;
    const href = {
      pathname: "/categories/[name]",
      query: { name: data.name, id: data.id },
    };
    return (
      <Link href={href} as={as} key={data.id}>
        <li>{data.name}</li>
      </Link>
    );
  });

  return (
    <>
      <header className={styles.header}>
        <nav
          className={
            scrollPosition === 0 ? styles.navBarHight : styles.navBarLow
          }
        >
          <Link href={"/"}>
            <div className={styles.logocontainer}>CinemaFlow</div>
          </Link>
          <div className={styles.tabContainer}>
            <Link href={"/"}>
              <div className={styles.tab}>Last Releases</div>
            </Link>
            <div className={styles.tab}>
              Categories
              <FontAwesomeIcon icon={faAngleDown} className={styles.tabIcon} />
              <div className={styles.tabModal}>
                <ul>{genres}</ul>
              </div>
            </div>
            <div className={styles.tab}>Best rated</div>
            <Link
              href={{
                pathname: "/likedMovies",
                query: { name: "Liked movies" },
              }}
              as={"/likedMovies"}
            >
              <div className={styles.tab}>
                Liked movies
                <span className={styles.counter} style={{ color: "#e74c3c" }}>
                  {likedCounter > 0 && likedCounter}
                </span>
              </div>
            </Link>
            <Link
              href={{ pathname: "/wishList", query: { name: "Wish list" } }}
              as={"/wishList"}
            >
              <div className={styles.tab}>Wish list
              <span className={styles.counter} style={{color: '#1a98ff'}}>
                {wishCounter > 0 && wishCounter}
              </span>
              </div>
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}
