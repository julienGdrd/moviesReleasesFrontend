import MovieList from "../components/MovieList";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function SearchResult() {
  const router = useRouter();
  console.log("resultPage :", router.query);

    const searchQuery = router.query.keyword;


 
  return (
    <MovieList
      pageTitle={`Results for : ${searchQuery}`}
      urlToFetch={{
        path: "http://localhost:3000/search",
        reqObj: {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ searchQuery }),
        },
      }}
    />
  );
}
