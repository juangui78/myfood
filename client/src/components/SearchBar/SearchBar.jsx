import searchIcon from '../../assets/images/searchIcon.svg'
import styles from './SearchBar.module.css'
import { getRecipes } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
export default function SearchBar() {
    const dispatch = useDispatch();

    const [recipe, setRecipe] = useState('');
    const [error, setError] = useState(null)

    const handleChange = (event) => {
        const {value} = event.target;
        setRecipe(value);
    }

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            console.log('valor enviado: ' + recipe)
            handleSearch(recipe)
        }
    }

    const handleSearch = (value) => {
        if (value) {
            dispatch(getRecipes(value))
        } else return;
        
    }

    return(
        <>
            <div className={styles.searchContainer}>
                <input type="search" className={styles.input} placeholder="Search a recipe..." onChange={handleChange} onKeyPress={handleEnter}/>
                <button className={styles.buttonSearchDiv} onClick={() => handleSearch(recipe)}>
                    <img src={searchIcon} alt="search" className={styles.searchIcon}/>
                </button>
                
            </div>
        </>
    )
}