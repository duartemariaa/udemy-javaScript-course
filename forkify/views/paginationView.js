import View from './View.js';

class paginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler){
        this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.btn-inline');
            if(!btn) return;

            const goToPage = +btn.dataset.goto;

            handler(goToPage);
        });
    }

    _generateMarkup() {
        const curPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

        if(curPage === 1 && numPages > 1){
            return `
                <button data-goto="${curPage + 1}" class="btn-inline pagination-btn-next">
                    <span>Page ${curPage + 1}</span>
                    <img src="./images/arrow-right.png" alt="" class="search-icon">
                </button>
            `;
        }

        if(curPage === numPages && numPages > 1) {
            return `
                <button data-goto="${curPage - 1}" class="btn-inline pagination-btn-prev">
                    <img src="./images/arrow-left.png" alt="" class="search-icon">
                    <span>Page ${curPage - 1}</span>
                </button>            
            `;
        }

        if(curPage < numPages){
            return `
                <button data-goto="${curPage - 1}" class="btn-inline pagination-btn-prev">
                    <img src="./images/arrow-left.png" alt="" class="search-icon">
                    <span>Page ${curPage - 1}</span>
                </button> 
                <button data-goto="${curPage + 1}" class="btn-inline pagination-btn-next">
                    <span>Page ${curPage + 1}</span>
                    <img src="./images/arrow-right.png" alt="" class="search-icon">
                </button>     
            `;
        }

        return '';
    }
}

export default new paginationView();