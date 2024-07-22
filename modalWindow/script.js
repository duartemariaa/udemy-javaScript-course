const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnShowModal = document.querySelectorAll('.show-modal');

console.log(btnShowModal);

for(let i=0; i<btnShowModal.length; i++){
    btnShowModal[i].addEventListener('click', function(){
        console.log('button clicked')
        modalWindow.classList.remove('hidden');
        overlay.classList.remove('hidden');
    });
}

const closeModal = function () {
    modalWindow.classList.add('hidden');
    overlay.classList.add('hidden');
}

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
