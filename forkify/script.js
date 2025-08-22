import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

const controlRecipes = async function() {
    try {
        const id = window.location.hash.slice(1);

        if(!id) return;

        recipeView.renderSpinner();

        await model.loadRecipe(id);

        recipeView.render(model.state.recipe);

        //TEST
        //controlServings();

    } catch (err) {
        recipeView.renderError();
    }
}

const controlSearchResults = async function() {
    try {
        resultsView.renderSpinner();

        const query = searchView.getQuery();
        if(!query) return;
        
        await model.loadSearchResults(query);

        
        // resultsView.render(model.state.search.results);
        resultsView.render(model.getSearchResultsPage());

        paginationView.render(model.state.search);
    } catch(err) {
        console.log(err);
    }
};


const controlPagination = function(goToPage){
    resultsView.render(model.getSearchResultsPage(goToPage));

    paginationView.render(model.state.search);
}

const controlServings = function(newServings) {
    model.updateServing(newServings);

    paginationView.render(model.state.recipe);
}

const init = function() {
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
}

init();

