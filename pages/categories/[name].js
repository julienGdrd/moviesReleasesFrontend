import MovieList from "../../components/MovieList";
import { useRouter } from "next/router";

export default function Categories() {
  const router = useRouter();
  const catData = router.query;
  return (
    <>
      <MovieList
        needToFetch={true}
        catData={catData}
        isHome={false}
        pageTitle={catData.name}
      />
    </>
  );
}
