import Categories from "../../components/Categorie"
import { useRouter } from 'next/router';

export default function CatName() {
    const router = useRouter();
    const catData = router.query
    return(
        <>
       <Categories catData={catData}/>
        </>
    )
}