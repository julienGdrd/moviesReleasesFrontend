import MovieList from "../components/MovieList";
import { useRouter } from "next/router";

export default function ComingSoon() {
  const router = useRouter();

  return (
    <MovieList
      pageTitle={"Coming Soon"}
      urlToFetch={{
        path: "http://localhost:3000/upcoming",
      }}
    />
  );
}
