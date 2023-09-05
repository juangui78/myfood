import { useEffect, useState } from 'react'
import styles from './CardsRecipes.module.css'
import CardRecipe from '../CardRecipe/CardRecipe'
import { getRecipes } from '../../redux/actions'
import {useSelector,useDispatch} from 'react-redux'
import logonotfound from '../../assets/images/notfound.png'
import prev from '../../assets/images/next.svg'
import next from '../../assets/images/prev.svg'
export default function CardsRecipes () {
    
    const dispatch = useDispatch()

    

    const recipes = useSelector(state => state.AllRecipes)

    useEffect(() => {
        dispatch(getRecipes())
    }, [])
    
    const RECIPESPERPAGE = 9;
    const [AllRecipes, setAllRecipes] = useState([])
    const [Cards, setCards] = useState([])
//  Estoy usando otro useEffect para actualizar Cards cuando recipes 
//  cambie (el estado en mi store)

    
    useEffect(() => {
        if (typeof recipes === 'string') {
            return
        }
        setAllRecipes(recipes);
        setCards([...recipes].splice(0, RECIPESPERPAGE))
        setCurrentPage(0)
    }, [recipes])

    const [currentPage, setCurrentPage] = useState(0)
    const prevHandler = () => {
        const prevPage = currentPage - 1;

        if (prevPage < 0) return

        const firstIndex = prevPage * RECIPESPERPAGE;
        const newCards = [...AllRecipes].splice(firstIndex, RECIPESPERPAGE);
    setCards(newCards);
    setCurrentPage(prevPage);
    }

    const nextHandler = () => {
        const totalRecipes = recipes.length;
        const nextPage = currentPage + 1;
        const firstIndex = nextPage * RECIPESPERPAGE;

        if (firstIndex === totalRecipes) return

        const newCards = [...AllRecipes].splice(firstIndex, RECIPESPERPAGE);
        setCards(newCards);
        setCurrentPage(nextPage);
    }

    return(
        <>
        

        <div className={styles.sectionCards}>
        {recipes === 'error' ? (
        
        <div className={styles.errorScreen}>
            <h2 className={styles.errorMessage}>Oops, looks like that recipe isn't here :(</h2>
            <img src={logonotfound} alt="not found" className={styles.notfound}/>
        </div>
        ) : (
            <>
            <div className={styles.containerCards}>
              {Cards.map((recipe) => (
                <CardRecipe
                  key={recipe.id}
                  id={recipe.id}
                  image={recipe.image}
                  title={recipe.title}
                  diets={recipe.diets}
                />
              ))}
            </div>

            <section className={styles.paginado}>
                <button onClick={prevHandler} className={styles.buttonPrev}>
                    <img src={prev} alt="previous page" width='24px'/>
                </button>
                <h3>{currentPage + 1}</h3>
                <button onClick={nextHandler} className={styles.buttonPrev}>
                    <img src={next} alt="next page" width='24px'/>
                </button>
            </section>
            </>
          )}
        </div>
  
        
        
        </>
    )
}