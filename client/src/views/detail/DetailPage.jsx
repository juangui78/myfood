import { useEffect, useState } from 'react';
import styles from './DetailPage.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
export default function DetailPage (props) {
    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3001/recipes/${id}`).then(({data}) => {
            if (data.title) {
                setRecipeInfo(data)
                
            } else {
                alert('Error! that recipe no exist')
            }
        })
    }, [id])

    const [recipeInfo, setRecipeInfo] = useState({})
    
    return (
        <>
        <div className={styles.DetailPage}>
            <div>
                <img src={recipeInfo.image} alt={recipeInfo.title} />
            </div>

            <section>
                <h2>{recipeInfo.title}</h2>
                <h3>Ready in {recipeInfo.readyInMinutes} Mins</h3>
                <h4>Health Score: {recipeInfo.healthScore}</h4>
                <div>
                    <h4>Summary: </h4>
                    <div dangerouslySetInnerHTML={{ __html: recipeInfo.summary}}></div>
                    <h4>Steps to do: </h4>
                    <div dangerouslySetInnerHTML={{ __html: recipeInfo.steps}}></div>
                </div>
            </section>
        </div>
        </>
    )
}