import View from './View.js';

class ResultsView extends View{
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No recipes found for your query! Please try again ;)';
    _message = '';

    _generateMarkup() {
        console.log(this._data);
        return this._data.map(this._generateMarkupPreview).join('');
    }

    _generateMarkupPreview(result) { 
        const id = window.location.hash.slice(1);

        return `
            <li class="preview">
                <a class="preview-link ${result.id === id ? 'preview-link-active' : ''}" href="#${result.id}">
                    <figure class="preview-fig">
                        <img src="${result.image}" alt="${result.title}" />
                    </figure>
                    <div class="preview-data">
                        <h4 class="preview-title">${result.title}</h4>
                        <p class="preview-publisher">${result.publisher}</p>
                    </div>
                </a>
            </li>
        `;
    }

}

export default new ResultsView();