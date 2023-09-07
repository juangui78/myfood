import { GET_RECIPES, GET_DIETS } from "./actions";

const initialState = {
    AllRecipes: [],
    AllDiets: []
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_RECIPES: 
            return {...state, AllRecipes: action.payload}
        
        case GET_DIETS:
            return {...state, AllDiets: action.payload}
            
        default: return {...state}
    }
}

export default rootReducer;