import {Fraction} from 'fractional';


class RecipeView {
    #parentElement = document.querySelector('.recipe');
    #data;
    #errorMessage = 'We could not find that recipe. Please try another one!';
    #message = '';

    render(data) {
        this.#data = data;
        const markup = this.#generateMarkup();
        this.#clear();
        recipeContainer.insertAdjacentElement('afterbegin', markup);
    }

    #clear() {
        this.#parentElement.innerHTML = ''
    }

    renderSpinner() {
        const markup = `
            <div class="spinner">
            <svg>
                <use href="src/img/icons.svg#icon-loader"></use>
            </svg>
            </div>
        `;
        this.#clear();
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderError(message = this.#errorMessage){
        const markup = `
            <div class="error">
                <div>
                <svg>
                    <use href="src/img/icons.svg#icon-alert-triangle"></use>
                </svg>
                </div>
                <p>${message}</p>
            </div> 
        `;
        this.#clear();
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderMessage(message = this.#message){
        const markup = `
            <div class="message">
                <div>
                <svg>
                    <use href="src/img/icons.svg#icon-smile"></use>
                </svg>
                </div>
                <p>${message}</p>
            </div> 
        `;
        this.#clear();
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
    }

    #generateMarkup() {
        return ` 
            <figure class="recipe-fig">
                <img src="${this.#data.image}" alt="${this.#data.title}" class="recipe-img" />
                <h1 class="${this.#data.title}">
                    <span>Pasta with tomato cream sauce</span>
                </h1>
            </figure>

            <div class="recipe-details">
                <div class="recipe-info">
                    <svg class="recipe-info-icon">
                    <use href="src/img/icons.svg#icon-clock"></use>
                    </svg>
                    <span class="recipe-info-data recipe-info-data--minutes">${this.#data.cookingTime}</span>
                    <span class="recipe-info-text">minutes</span>
                </div>
            <div class="recipe-info">
                <svg class="recipe-info-icon">
                <use href="src/img/icons.svg#icon-users"></use>
                </svg>
                <span class="recipe-info-data recipe-info-data-people">${this.#data.servings}</span>
                <span class="recipe-info-text">servings</span>

                <div class="recipe-info-buttons">
                    <button class="btn-tiny btn-increase-servings">
                        <svg>
                        <use href="src/img/icons.svg#icon-minus-circle"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny btn-increase-servings">
                        <svg>
                        <use href="src/img/icons.svg#icon-plus-circle"></use>
                        </svg>
                    </button>
                </div>
            </div>

            <div class="recipe-user-generated">
                <svg>
                <use href="src/img/icons.svg#icon-user"></use>
                </svg>
            </div>
            <button class="btn-round">
                <svg class="">
                <use href="src/img/icons.svg#icon-bookmark-fill"></use>
                </svg>
            </button>
            </div>

            <div class="recipe-ingredients">
                <h2 class="heading-2">Recipe ingredients</h2>
                <ul class="recipe-ingredient-list">
                    ${this.#data.ingredients.map(this.#generateMarkupIngredient).join(' ')}
                </ul>
            </div>

            <div class="recipe-directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe-directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe-publisher">${this.#data.publisher}</span>. Please check out
                    directions at their website.
                </p>
                <a
                    class="btn-small recipe-btn"
                    href="${this.#data.sourceUrl}"
                    target="_blank">
                    <span>Directions</span>
                    <svg class="search-icon">
                    <use href="src/img/icons.svg#icon-arrow-right"></use>
                    </svg>
                </a>
            </div>
        `;
    }

    #generateMarkupIngredient(ing){
        return `
            <li class="recipe-ingredient">
                <svg class="recipe-icon">
                    <use href="src/img/icons.svg#icon-check"></use>
                </svg>
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