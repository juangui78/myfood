export default function validate (recipeData) {
    const errors = {};

    const regexIMAGES = /([a-z\-_0-9/:.]*\.(jpg|jpeg|png|webp))/i;

    if (!recipeData.title) {
        errors.title = 'Please write your recipe name'
    } else if (/\d/.test(recipeData.name)) {
        errors.title = 'The recipe name can not have numbers/digits'
    } else if (recipeData.title.length > 60) {
        errors.title = 'The recipe name can not have more than 60 characters'
    } else {
        errors.title = ""
    }

    if (!regexIMAGES.test(recipeData.image)) {
        errors.image = "Please insert a valid image URL"
    } else {
        errors.image = ""
    }

    if (recipeData.summary.length > 400) {
        errors.summary = "Max 400 characters"
    } else {
        errors.summary = ""
    }

    if (recipeData.healthScore.includes('-')) {
        errors.healthScore = "out of range (0.0 - 10.0)"
    } else if (!/^[-+]?[0-9]*\.?[0-9]+$/.test(parseFloat(recipeData.healthScore))){
        errors.healthScore = "The score should be a float"
    } else if ( isNaN(recipeData.healthScore) || parseFloat(recipeData.healthScore < 0.0) || parseFloat(recipeData.hscore) > 10.0){
        errors.healthScore = "out of range (0.0 - 10.0)"
    } else {
        errors.healthScore = ""
    }

    if (!recipeData.steps) {
        errors.steps = "Please specify the instructions of this recipe"
    } else {
        errors.steps = ""
    }

    return errors;

}