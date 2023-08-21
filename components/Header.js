import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Header.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useClickOutside } from "../hooks/useClickOutside";
import { Headers } from "node-fetch";

export default function Header() {
  const [genreList, setGenreList] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  const [showModalSearch, setShowModalSearch] = useState(false);
  const modalSearchRef = useClickOutside(() => {
    setShowModalSearch(false);
    setSearchQuery("");
    console.log("outside");
  });

  const [searchQuery, setSearchQuery] = useState("");

  const likedList = useSelector((state) => state.likedMovies.value);
  const likedCounter = likedList.length;
  const wishList = useSelector((state) => state.wishList.value);
  const wishCounter = wishList.length;

  const router = useRouter();
  const pageName = router.pathname;
  const activeTabStyle = { color: "white", borderBottom: "2px solid white" };

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleShowModalSearch = () => {
    setShowModalSearch(!showModalSearch);
  };

  // Search movies
  const handleSearchMovies = () => {
    router.push(
      {
        pathname: "/searchResult",
        query: { keyword: searchQuery },
      },
      `/searchResult?query=${searchQuery}`
    );
    setSearchQuery("");
    setShowModalSearch(false);
  };

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
              <div
                className={styles.tab}
                style={pageName === "/" ? activeTabStyle : {}}
              >
                Last Releases
              </div>
            </Link>
            <Link
              href={{ pathname: "/comingSoon", query: { name: "Coming Soon" } }}
              as={"/ComingSoon"}
            >
              <div
                className={styles.tab}
                style={pageName === "/comingSoon" ? activeTabStyle : {}}
              >
                Coming Soon
              </div>
            </Link>
            <div
              className={styles.tab}
              style={pageName === "/categories/[name]" ? activeTabStyle : {}}
            >
              Categories
              <FontAwesomeIcon icon={faAngleDown} className={styles.tabIcon} />
              <div className={styles.tabModal}>
                <ul>{genres}</ul>
              </div>
            </div>

            <Link
              href={{
                pathname: "/likedMovies",
                query: { name: "Liked movies" },
              }}
              as={"/likedMovies"}
            >
              <div
                className={styles.tab}
                style={pageName === "/likedMovies" ? activeTabStyle : {}}
              >
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
              <div
                className={styles.tab}
                style={pageName === "/wishList" ? activeTabStyle : {}}
              >
                Wish list
                <span className={styles.counter} style={{ color: "#1a98ff" }}>
                  {wishCounter > 0 && wishCounter}
                </span>
              </div>
            </Link>
            <div
              className={styles.tab}
              style={showModalSearch ? { backgroundColor: "#191e25" } : {}}
              onClick={handleShowModalSearch}
              ref={modalSearchRef}
            >
              <FontAwesomeIcon
                icon={!showModalSearch ? faMagnifyingGlass : faXmark}
                className={styles.searchIcon}
                style={showModalSearch ? { color: "white" } : {}}
              />
              {showModalSearch && (
                <div
                  className={styles.modalSearch}
                  onClick={(e) => e.stopPropagation()}
                >
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      searchQuery.trim() !== "" && handleSearchMovies();
                    }}
                  >
                    <div className={styles.searchBar}>
                      <span className={styles.searchBarIcon}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </span>
                      <input
                        autoFocus
                        type="text"
                        placeholder="Search"
                        className={styles.searchInput}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                      />
                      <div
                        className={styles.deleteBtn}
                        onClick={() => setSearchQuery("")}
                      >
                        Delete
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
