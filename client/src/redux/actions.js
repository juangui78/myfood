import axios from 'axios';

export const GET_RECIPES = 'GET_RECIPES';
export const GET_DIETS = 'GET_DIETS';

export const getRecipes = (nameRecipe) => {
    return function (dispatch) {
        
        if (nameRecipe) {
            
            axios.get(`http://localhost:3001/recipes/?name=${nameRecipe}`)
                .then(({data}) => {
                    console.log('llego al dispatch bueno')
                    return dispatch({
                        
                        type: GET_RECIPES,
                        payload: data
                    })
                })
                .catch((error) => {

                    return dispatch({
                        type: GET_RECIPES,
                        payload: 'error'
                    })
                })
        } else {
            axios.get('http://localhost:3001/recipes')
                .then(({data}) => {

                    return dispatch({
                        type: GET_RECIPES,
                        payload: data
                    })
                })
                .catch((error) => error.message)
        }
        
    }
}

export const getDiets = () => {
    return function (dispatch) {
        try {
            axios.get("http://localhost:3001/diets")
                .then(({data}) => {

                    return dispatch({
                        type: GET_DIETS,
                        payload: data
                    })
                })
                .then(() => console.log("diets charged"))
        } catch (error) {
            console.log('Error in the Diets Load', error.message)
        }
    }
}