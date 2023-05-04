import MovieList from '../components/MovieList';
import { useRouter } from 'next/router';


export default function LikedMovies() {
  const router = useRouter();
  
  return <MovieList isHome={false} pageTitle={'Liked movies'}/>;
}

