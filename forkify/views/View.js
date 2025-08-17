export default class View {
    _data;

    render(data) {
        if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    renderSpinner() {
        const markup = `
            <div class="spinner">
                <img src="./images/spinner.png" alt="">
            </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderError(message = this._errorMessage){
        const markup = `
            <div class="error">
                <div>
                    <img src="./images/attention.png" alt="">
                </div>
                <p>${message}</p>
            </div> 
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderMessage(message = this._message){
        const markup = `
            <div class="message">
                <div>
                    <img src="./images/smile.png" alt="">
                </div>
                <p>${message}</p>
            </div> 
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

}