import MovieList from "../../components/MovieList";
import { useRouter } from "next/router";

export default function Categories() {
  const router = useRouter();
  const catData = router.query;
  return (
    <>
      <MovieList
        catData={catData}
        pageTitle={catData.name}
        urlToFetch={{
          path: "http://localhost:3000/byCat",
          reqObj: {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ genreId: catData.id }),
          }
        }}
      />
    </>
  );
}
