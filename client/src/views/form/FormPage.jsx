import { useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import styles from './FormPage.module.css'
import validate from './validation'
export default function FormCreateRecipe (props) {
    const [recipeData, setRecipeData] = useState({
        title: "",
        image: "",
        summary: "",
        healthScore: "",
        steps: "",
        veryPopular: false,
        diets: []
    })

    const [errors, setErrors] = useState({
        title: "",
        image: "",
        summary: "",
        healthScore: "",
        steps: ""
    })


    const [selectedDiets, setSelectedDiets] = useState([])

    const handleSelectChange = (event) => {
        const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
        setSelectedDiets(selectedValues);
        setRecipeData({...recipeData, diets: selectedValues})
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        if (name === 'popular') {
            if (value === 'yes') setRecipeData({...recipeData, [name]: true})
            else {setRecipeData({...recipeData, [name]: false})}
        } else if (name === 'healthScore'){
            setRecipeData({...recipeData, [name]: (value)})
            setErrors(
                validate({...recipeData, [event.target.name]: event.target.value})
            )

        } else {
            setRecipeData({...recipeData, [event.target.name]: event.target.value})
            setErrors(
                validate({...recipeData, [event.target.name]: event.target.value})
            )
        }
        
        
    }
    

    const handleSubmit = (event) => {
        event.preventDefault()
        const hasErrors = Object.values(errors).some((error) => error !== "")

        if (!hasErrors) createRecipe(recipeData)
        else {
            alert('Please fill all the obligatory information')
        }
        
    }

    const createRecipe = async(recipeData) => {
        console.log(recipeData)
        try {
            const create = await axios.post('http://localhost:3001/recipes', recipeData)

            alert('Your recipe was created succesfully!')
            setRecipeData({
                title: "",
                image: "",
                summary: "",
                healthScore: "",
                steps: "",
                veryPopular: false,
                diets: []
            })

            setErrors({
                title: "",
                image: "",
                summary: "",
                healthScore: "",
                steps: ""
            })
        } catch (error) {
            alert('Error, please try again: ', error)
        }
        
      }

    return(
        <>
        <section className={styles.container}>
            <div className={styles.leftSide}>
                <div className={styles.baseForm}>
                    <h2>Create a Recipe</h2>
                    <h4 className={styles.textSlogan}>Let's create a new recipe!</h4>
                </div>
               
                <Link to='/home'>
                    <button>Back To Home</button>
                </Link>
            </div>

            <main className={styles.containerForm}>
                <form className={styles.formStyle}> 
                    <label>Recipe Name: </label>
                    <input type="text" name='title' value={recipeData.title} onChange={handleChange}/>
                    <label className={styles.warningText}>{errors.title}</label>

                    <label>Paste an Image URL</label>
                    <input type="text" name='image' value={recipeData.image} onChange={handleChange}/>
                    <label className={styles.warningText}>{errors.image}</label>

                    <label>Summary: </label>
                    <input type="text" name='summary' value={recipeData.summary} onChange={handleChange}/>
                    <label className={styles.warningText}>{errors.summary}</label>

                    <label>Health Score: </label>
                    <input type='text' name='healthScore' placeholder='0.0 - 10.0' value={recipeData.healthScore} onChange={handleChange}/>
                    <label className={styles.warningText}>{errors.healthScore}</label>

                    <label>Steps: </label>
                    <input type="text" name='steps' value={recipeData.steps} onChange={handleChange}/>
                    <label className={styles.warningText}>{errors.steps}</label>
                    
                    <label>It is Popular? </label>
                    <select name='popular' value={recipeData.popular ? 'yes' : 'no'} onChange={handleChange}>
                        <option value="">---</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>

                    <label>Select your type diet(s)</label>
                    <label className={styles.multipleDietsText}>Ctrl + Click to add two or more diets</label>
    
                    <select name="diets" id="diets" multiple value={selectedDiets}
                    onChange={handleSelectChange} className={styles.selectStyle}>
                        <option value="">---</option>
                        <option value="gluten free">gluten free</option>
                        <option value="vegetarian">vegetarian</option>
                        <option value="lacto vegetarian">lacto vegetarian</option>
                        <option value="ovo vegetarian">ovo vegetarian</option>
                        <option value="vegan">vegan</option>
                        <option value="pescetarian">pescetarian</option>
                        <option value="low fodmap">low fodmap</option>
                        <option value="whole 30">whole 30</option>
                        <option value="dairy free">dairy free</option>
                    </select>
                    <div>
                        <h4 className={styles.selectedDietsTitle}>Selected Diets: </h4>
                        <div className={styles.dietSelected}>
                            {selectedDiets.map((diet, index) => (
                                <div key={index}>
                                    <h3>{diet}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button type='submit' onClick={handleSubmit}>Create</button>

                </form>
            </main>
            
            
        </section>
        
        </>
    )
}