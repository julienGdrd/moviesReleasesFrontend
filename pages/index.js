
import MovieList from '../components/MovieList';
import { useRouter } from 'next/router';


function Index() {
  const router = useRouter();
  
  return <MovieList isHome={true} pageTitle={'Last Releases'}/>;
}

export default Index;
