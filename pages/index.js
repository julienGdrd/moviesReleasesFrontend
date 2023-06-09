import MovieList from "../components/MovieList";
import { useRouter } from "next/router";

function Index() {
  const router = useRouter();

  return (
    <MovieList
      pageTitle={"Last Releases"}
      urlToFetch={{
        path: "http://localhost:3000/movies",
      }}
    />
  );
}

export default Index;
