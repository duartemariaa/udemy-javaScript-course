// import { Fraction } from '../node_modules/fractional/fractional';
// import { Fraction } from 'https://cdn.skypack.dev/fractional';
import View from './View.js';

class RecipeView extends View{
    _parentElement = document.querySelector('.recipe');
    _errorMessage = 'We could not find that recipe. Please try another one!';
    _message = '';

    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
    }

    addHandlerUpdateServings(handler){
        this._parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.bnt-tiny');
            if(!btn) return;
            const updateTo = +btn.dataset.updateTo;
            if(updateTo > 0) handler(updateTo);
        });
    }

    _generateMarkup() {
        return ` 
            <figure class="recipe-fig">
                <img src="${this._data.image}" alt="${this._data.title}" class="recipe-img" />
                <h1 class="${this._data.title}">
                    <span>Pasta with tomato cream sauce</span>
                </h1>
            </figure>

            <div class="recipe-details">
                <div class="recipe-info">
                    <img src="./images/clock.png" alt="" class="recipe-info-icon">
                    <span class="recipe-info-data recipe-info-data--minutes">${this._data.cookingTime}</span>
                    <span class="recipe-info-text">minutes</span>
                </div>
            <div class="recipe-info">
                <img src="./images/users.png" alt="" class="recipe-info-icon">
                <span class="recipe-info-data recipe-info-data-people">${this._data.servings}</span>
                <span class="recipe-info-text">servings</span>

                <div class="recipe-info-buttons">
                    <button class="btn-tiny btn-update-servings" data-update-to="${this._data.servings - 1}">
                        <img src="./images/minus-circle.png" alt="">
                    </button>
                    <button class="btn-tiny btn-update-servings" data-update-to="${this._data.servings + 1}">
                        <img src="./images/plus-circle.png" alt="">
                    </button>
                </div>
            </div>

            <div class="recipe-user-generated">
            </div>

            <button class="btn-round">
                <img src="./images/bookmark.png" alt="">
            </button>
            </div>

            <div class="recipe-ingredients">
                <h2 class="heading-2">Recipe ingredients</h2>
                <ul class="recipe-ingredient-list">
                    ${this._data.ingredients.map(this._generateMarkupIngredient).join(' ')}
                </ul>
            </div>

            <div class="recipe-directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe-directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe-publisher">${this._data.publisher}</span>. Please check out
                    directions at their website.
                </p>
                <a
                    class="btn-small recipe-btn"
                    href="${this._data.sourceUrl}"
                    target="_blank">
                    <span>Directions</span>
                    <img src="./images/arrow-right.png" alt="" class="search-icon">
                </a>
            </div>
        `;
    }

    _generateMarkupIngredient(ing){
        return `
            <li class="recipe-ingredient">
                <img src="./images/check.png" alt="" class="recipe-icon">
                <div class="recipe-quantity">${ing.quantity ? new Fraction(ing.quantity).toString() : ''}</div>
                <div class="recipe-description">
                    <span class="recipe-unit">${ing.unit}</span>
                    ${ing.description}
                </div>
            </li>
        `;    
    }

}

export default new RecipeView();