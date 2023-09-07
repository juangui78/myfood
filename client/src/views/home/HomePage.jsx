import styles from './HomePage.module.css'
import SearchBar from "../../components/SearchBar/SearchBar"
import CardsRecipes from '../../components/CardsRecipes/CardsRecipes'
import logo from "../../assets/images/logotype.png"
import createIcon from "../../assets/images/create_icon.svg"
import { Link } from 'react-router-dom'
export default function HomePage () {
    
    return(
        <>
            <nav className={styles.navbar}>
                <img src={logo} alt="logo" width="50px"/>
                <SearchBar/>
                
                <button className={styles.buttonOptions}>
                <Link to="/create" className={styles.createIconDiv}>
                    <img src={createIcon} alt="logo" width="25px"/>
                </Link>
                </button>
                
            </nav>

            <section className="sectionRecipes">
                <CardsRecipes/>
            </section>
        </>
    )
}