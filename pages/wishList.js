import MovieList from '../components/MovieList';
import { useRouter } from 'next/router';


export default function WishList() {
  const router = useRouter();
  
  return <MovieList isHome={false} pageTitle={'Wish list'}/>;
}

