import { GET_RECIPES } from "./actions";

const initialState = {
    AllRecipes: []
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_RECIPES: 
            return {...state, AllRecipes: action.payload}
        default: return {...state}
    }
}

export default rootReducer;