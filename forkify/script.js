import * as model from './model.js';
import recipeView from './views/recipeView.js';

const recipeContainer = document.querySelector('.recipe');

const controlRecipe = async function() {
    try {
        const id = window.location.hash.slice(1);
        console.log(id);

        if(!id) return;

        recipeView.renderSpinner();

        await model.loadRecipe(id);

        recipeView.render(model.state.recipe);

    } catch (error) {
        console.error(error)
    }
}

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipe));

