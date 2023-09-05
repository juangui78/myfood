import styles from './CardRecipe.module.css';
import { Link } from 'react-router-dom';

export default function CardRecipe (props) {
    const {id, title, image, diets} = props;
    return(
        <>
            <div className={styles.cardRecipe}>
                <Link to={`/detail/${id}`} className={styles.linkTag}>
                <img src={image} alt={title} className={styles.imageRecipe} />
                <h2 className={styles.title}>{title}</h2>
                </Link>
                <div className={styles.dietsToLeft}>
                    <h2 className={styles.dietsSection}>Diets</h2>
                </div>
                <div className={styles.typediets}>
                    {diets.map((diet, index) => (
                        <h2 className={styles.diets} key={index}>{diet}</h2>
                    ))}
                </div>
                
                
            </div>
        </>
    )
}